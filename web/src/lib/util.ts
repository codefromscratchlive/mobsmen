import * as v from 'valibot';

const util_handlers_cache: UtilHandlersCache = {};

export function util_event_handler(handler_item: UtilEventHandlerItem): void {
  const result = v.safeParse(UtilEventHandlerItemSchema, handler_item);
  if (!result.success) {
    console.error(result.issues);
    return;
  }

  const event_name = handler_item.event_name;

  // Initialize cache and listener only if not already present
  if (!util_handlers_cache[event_name]) {
    util_handlers_cache[event_name] = [];
    document.addEventListener(event_name, (event) => {
      util_handlers_cache[event_name]?.forEach(({ id, class_name, handler }) => {
        if (!(event.target instanceof HTMLElement)) return;
        const target = event.target as HTMLElement;
        if (
          (class_name && target.classList.contains(class_name)) ||
          (id && target.id === id)
        ) {
          handler(event);
        }
      });
    });
  }

  // Always add or update the handler, regardless of cache existence
  const cache_item = util_handlers_cache[event_name];
  const cache_index = cache_item.findIndex(
    h => h.handler_id === handler_item.handler_id
  );
  if (cache_index !== -1) {
    cache_item.splice(cache_index, 1, handler_item); // Update existing handler
  } else {
    cache_item.push(handler_item); // Add new handler
  }
}

type UtilEventHandlerType = ((event: Event) => void) | ((event: Event) => Promise<void>);
const UtilEventHandlerFuncSchema = v.custom<UtilEventHandlerType>(
  (input) => typeof input === 'function',
  'Handler must be a function'
);
const UtilEventHandlerItemSchema = v.union([
  v.object({
    id: v.string(),
    class_name: v.optional(v.string()),
    event_name: v.string(),
    handler_id: v.string(),
    handler: UtilEventHandlerFuncSchema
  }),
  v.object({
    id: v.optional(v.string()),
    class_name: v.string(),
    event_name: v.string(),
    handler_id: v.string(),
    handler: UtilEventHandlerFuncSchema
  }),
]);
type UtilEventHandlerItem = v.InferOutput<typeof UtilEventHandlerItemSchema>;
const UtilHandlersCacheSchema = v.record(v.string(), v.array(UtilEventHandlerItemSchema));
type UtilHandlersCache = v.InferOutput<typeof UtilHandlersCacheSchema>;