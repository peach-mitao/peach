"""Shared PostHog client for the Peach web server."""
import atexit
import logging
import os

from posthog import Posthog


LOGGER = logging.getLogger(__name__)


def create_posthog_client() -> Posthog | None:
    """Create the process-wide client when PostHog is configured."""
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
    client = Posthog(
        project_token,
        host=host,
        enable_exception_autocapture=True,
    )
    atexit.register(client.shutdown)
    return client
