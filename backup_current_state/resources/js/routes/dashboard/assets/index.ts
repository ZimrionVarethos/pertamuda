import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\AssetController::index
 * @see app/Http/Controllers/AssetController.php:24
 * @route '/dashboard/assets'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/dashboard/assets',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AssetController::index
 * @see app/Http/Controllers/AssetController.php:24
 * @route '/dashboard/assets'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AssetController::index
 * @see app/Http/Controllers/AssetController.php:24
 * @route '/dashboard/assets'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\AssetController::index
 * @see app/Http/Controllers/AssetController.php:24
 * @route '/dashboard/assets'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\AssetController::index
 * @see app/Http/Controllers/AssetController.php:24
 * @route '/dashboard/assets'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\AssetController::index
 * @see app/Http/Controllers/AssetController.php:24
 * @route '/dashboard/assets'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\AssetController::index
 * @see app/Http/Controllers/AssetController.php:24
 * @route '/dashboard/assets'
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
* @see \App\Http\Controllers\AssetController::store
 * @see app/Http/Controllers/AssetController.php:81
 * @route '/dashboard/assets'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/dashboard/assets',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\AssetController::store
 * @see app/Http/Controllers/AssetController.php:81
 * @route '/dashboard/assets'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AssetController::store
 * @see app/Http/Controllers/AssetController.php:81
 * @route '/dashboard/assets'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\AssetController::store
 * @see app/Http/Controllers/AssetController.php:81
 * @route '/dashboard/assets'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\AssetController::store
 * @see app/Http/Controllers/AssetController.php:81
 * @route '/dashboard/assets'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\AssetController::show
 * @see app/Http/Controllers/AssetController.php:126
 * @route '/dashboard/assets/{asset}'
 */
export const show = (args: { asset: number | { id: number } } | [asset: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/dashboard/assets/{asset}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AssetController::show
 * @see app/Http/Controllers/AssetController.php:126
 * @route '/dashboard/assets/{asset}'
 */
show.url = (args: { asset: number | { id: number } } | [asset: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { asset: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { asset: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    asset: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        asset: typeof args.asset === 'object'
                ? args.asset.id
                : args.asset,
                }

    return show.definition.url
            .replace('{asset}', parsedArgs.asset.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\AssetController::show
 * @see app/Http/Controllers/AssetController.php:126
 * @route '/dashboard/assets/{asset}'
 */
show.get = (args: { asset: number | { id: number } } | [asset: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\AssetController::show
 * @see app/Http/Controllers/AssetController.php:126
 * @route '/dashboard/assets/{asset}'
 */
show.head = (args: { asset: number | { id: number } } | [asset: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\AssetController::show
 * @see app/Http/Controllers/AssetController.php:126
 * @route '/dashboard/assets/{asset}'
 */
    const showForm = (args: { asset: number | { id: number } } | [asset: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\AssetController::show
 * @see app/Http/Controllers/AssetController.php:126
 * @route '/dashboard/assets/{asset}'
 */
        showForm.get = (args: { asset: number | { id: number } } | [asset: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\AssetController::show
 * @see app/Http/Controllers/AssetController.php:126
 * @route '/dashboard/assets/{asset}'
 */
        showForm.head = (args: { asset: number | { id: number } } | [asset: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show.form = showForm
const assets = {
    index: Object.assign(index, index),
store: Object.assign(store, store),
show: Object.assign(show, show),
}

export default assets