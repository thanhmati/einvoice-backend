import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { EXECUTION_CONTEXT_REQ_INDEX, MetadataKeys } from "@common/constants/decorators.constant";
import { getProcessId } from '@common/utils/string.utils';

export const ProcessID = createParamDecorator((_: unknown, ctx: ExecutionContext) => {
    const req = ctx.getArgByIndex(EXECUTION_CONTEXT_REQ_INDEX);

    return (req[MetadataKeys.PROCESS_ID] as string) || getProcessId();
});

