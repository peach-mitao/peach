"""Dedicated OpenTelemetry log export for PostHog."""
from __future__ import annotations

from dataclasses import dataclass
import logging
import os

from opentelemetry.exporter.otlp.proto.http._log_exporter import OTLPLogExporter
from opentelemetry.sdk._logs import LoggerProvider, LoggingHandler
from opentelemetry.sdk._logs.export import BatchLogRecordProcessor


LOGGER = logging.getLogger(__name__)
POSTHOG_LOGGER = logging.getLogger("peach.posthog")


@dataclass
class PostHogLogExporter:
    """Own the handler so only purpose-written PostHog logs are exported."""

    logger_provider: LoggerProvider
    handler: LoggingHandler

    def shutdown(self) -> None:
        POSTHOG_LOGGER.removeHandler(self.handler)
        self.logger_provider.shutdown()


def create_posthog_log_exporter() -> PostHogLogExporter | None:
    """Configure isolated OTLP log export when PostHog is configured."""
    project_token = os.environ.get("POSTHOG_PROJECT_TOKEN")
    host = os.environ.get("POSTHOG_HOST")
    if not project_token or not host:
        if os.environ.get("PEACH_DEV") == "1":
            missing = "POSTHOG_PROJECT_TOKEN" if not project_token else "POSTHOG_HOST"
            LOGGER.warning(
                "%s variable required by PostHog is missing or un-configured, "
                "this causes events to be silently missed. This error stops "
                "appearing once %s is configured",
                missing,
                missing,
            )
        return None

    logger_provider = LoggerProvider()
    exporter = OTLPLogExporter(
        endpoint=f"{host.rstrip('/')}/i/v1/logs",
        headers={"Authorization": f"Bearer {project_token}"},
    )
    logger_provider.add_log_record_processor(BatchLogRecordProcessor(exporter))
    handler = LoggingHandler(level=logging.INFO, logger_provider=logger_provider)
    POSTHOG_LOGGER.setLevel(logging.INFO)
    POSTHOG_LOGGER.propagate = False
    POSTHOG_LOGGER.addHandler(handler)
    return PostHogLogExporter(logger_provider=logger_provider, handler=handler)
