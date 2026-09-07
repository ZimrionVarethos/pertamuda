import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\MaintenanceTaskController::index
 * @see app/Http/Controllers/MaintenanceTaskController.php:21
 * @route '/dashboard/maintenance'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/dashboard/maintenance',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\MaintenanceTaskController::index
 * @see app/Http/Controllers/MaintenanceTaskController.php:21
 * @route '/dashboard/maintenance'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MaintenanceTaskController::index
 * @see app/Http/Controllers/MaintenanceTaskController.php:21
 * @route '/dashboard/maintenance'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\MaintenanceTaskController::index
 * @see app/Http/Controllers/MaintenanceTaskController.php:21
 * @route '/dashboard/maintenance'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\MaintenanceTaskController::index
 * @see app/Http/Controllers/MaintenanceTaskController.php:21
 * @route '/dashboard/maintenance'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\MaintenanceTaskController::index
 * @see app/Http/Controllers/MaintenanceTaskController.php:21
 * @route '/dashboard/maintenance'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\MaintenanceTaskController::index
 * @see app/Http/Controllers/MaintenanceTaskController.php:21
 * @route '/dashboard/maintenance'
 */
        indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index.form = indexForm
/**
* @see \App\Http\Controllers\MaintenanceTaskController::store
 * @see app/Http/Controllers/MaintenanceTaskController.php:76
 * @route '/dashboard/maintenance'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/dashboard/maintenance',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\MaintenanceTaskController::store
 * @see app/Http/Controllers/MaintenanceTaskController.php:76
 * @route '/dashboard/maintenance'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MaintenanceTaskController::store
 * @see app/Http/Controllers/MaintenanceTaskController.php:76
 * @route '/dashboard/maintenance'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\MaintenanceTaskController::store
 * @see app/Http/Controllers/MaintenanceTaskController.php:76
 * @route '/dashboard/maintenance'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\MaintenanceTaskController::store
 * @see app/Http/Controllers/MaintenanceTaskController.php:76
 * @route '/dashboard/maintenance'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\MaintenanceTaskController::update
 * @see app/Http/Controllers/MaintenanceTaskController.php:120
 * @route '/dashboard/maintenance/{task}'
 */
export const update = (args: { task: number | { id: number } } | [task: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

update.definition = {
    methods: ["patch"],
    url: '/dashboard/maintenance/{task}',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\MaintenanceTaskController::update
 * @see app/Http/Controllers/MaintenanceTaskController.php:120
 * @route '/dashboard/maintenance/{task}'
 */
update.url = (args: { task: number | { id: number } } | [task: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { task: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { task: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    task: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        task: typeof args.task === 'object'
                ? args.task.id
                : args.task,
                }

    return update.definition.url
            .replace('{task}', parsedArgs.task.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\MaintenanceTaskController::update
 * @see app/Http/Controllers/MaintenanceTaskController.php:120
 * @route '/dashboard/maintenance/{task}'
 */
update.patch = (args: { task: number | { id: number } } | [task: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\MaintenanceTaskController::update
 * @see app/Http/Controllers/MaintenanceTaskController.php:120
 * @route '/dashboard/maintenance/{task}'
 */
    const updateForm = (args: { task: number | { id: number } } | [task: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PATCH',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\MaintenanceTaskController::update
 * @see app/Http/Controllers/MaintenanceTaskController.php:120
 * @route '/dashboard/maintenance/{task}'
 */
        updateForm.patch = (args: { task: number | { id: number } } | [task: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update.form = updateForm
const MaintenanceTaskController = { index, store, update }

export default MaintenanceTaskController