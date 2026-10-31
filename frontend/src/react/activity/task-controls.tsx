/* 任务动作由服务端逐轮给出；收到控制请求不代表后台已经停稳，状态仍以轮询为准。 */
import { useQueryClient } from '@tanstack/react-query';

import { Button } from '@/components/base/buttons/button';

import { Note } from '../components/note';
import { busyProps, useAction } from '../settings/use-action';
import { controlTask, isActive, TASKS_KEY, type TaskControlAction, type TaskRunPayload } from './tasks';

export function TaskControls({ run }: { run: TaskRunPayload }) {
  const client = useQueryClient();
  const request = useAction();
  const actions = run.control?.actions || [];
  if (!isActive(run) || !actions.length) return null;

  const submit = (action: TaskControlAction) => {
    void request.run(action, (signal) => controlTask(run.id, action, signal), () => {
      void client.invalidateQueries({ queryKey: TASKS_KEY });
    });
  };

  return (
    <div className="flex min-w-0 flex-col gap-2" data-task-controls={run.id}>
      <div role="group" aria-label={`${run.task_label}任务控制`} className="flex flex-wrap items-center gap-2">
        {actions.map((action) => <Button key={action} type="button" variant="secondary" size="small"
          {...busyProps(request.busy === action)} aria-disabled={Boolean(request.busy) || undefined}
          onClick={() => submit(action)}
          data-copy-key={`tasks.control.action.${action}`}>
          {action === 'pause' ? '暂停' : action === 'resume' ? '继续' : '取消'}
        </Button>)}
      </div>
      {request.error ? <Note tone="error">{request.error}</Note> : null}
    </div>
  );
}
