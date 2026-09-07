import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\DataSourceController::show
 * @see app/Http/Controllers/DataSourceController.php:79
 * @route '/dashboard/data/imports/{import}'
 */
export const show = (args: { import: number | { id: number } } | [importParam: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/dashboard/data/imports/{import}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\DataSourceController::show
 * @see app/Http/Controllers/DataSourceController.php:79
 * @route '/dashboard/data/imports/{import}'
 */
show.url = (args: { import: number | { id: number } } | [importParam: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { import: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { import: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    import: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        import: typeof args.import === 'object'
                ? args.import.id
                : args.import,
                }

    return show.definition.url
            .replace('{import}', parsedArgs.import.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\DataSourceController::show
 * @see app/Http/Controllers/DataSourceController.php:79
 * @route '/dashboard/data/imports/{import}'
 */
show.get = (args: { import: number | { id: number } } | [importParam: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\DataSourceController::show
 * @see app/Http/Controllers/DataSourceController.php:79
 * @route '/dashboard/data/imports/{import}'
 */
show.head = (args: { import: number | { id: number } } | [importParam: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\DataSourceController::show
 * @see app/Http/Controllers/DataSourceController.php:79
 * @route '/dashboard/data/imports/{import}'
 */
    const showForm = (args: { import: number | { id: number } } | [importParam: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\DataSourceController::show
 * @see app/Http/Controllers/DataSourceController.php:79
 * @route '/dashboard/data/imports/{import}'
 */
        showForm.get = (args: { import: number | { id: number } } | [importParam: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\DataSourceController::show
 * @see app/Http/Controllers/DataSourceController.php:79
 * @route '/dashboard/data/imports/{import}'
 */
        showForm.head = (args: { import: number | { id: number } } | [importParam: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show.form = showForm
/**
* @see \App\Http\Controllers\DataSourceController::confirm
 * @see app/Http/Controllers/DataSourceController.php:121
 * @route '/dashboard/data/imports/{import}/confirm'
 */
export const confirm = (args: { import: number | { id: number } } | [importParam: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: confirm.url(args, options),
    method: 'post',
})

confirm.definition = {
    methods: ["post"],
    url: '/dashboard/data/imports/{import}/confirm',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\DataSourceController::confirm
 * @see app/Http/Controllers/DataSourceController.php:121
 * @route '/dashboard/data/imports/{import}/confirm'
 */
confirm.url = (args: { import: number | { id: number } } | [importParam: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { import: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { import: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    import: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        import: typeof args.import === 'object'
                ? args.import.id
                : args.import,
                }

    return confirm.definition.url
            .replace('{import}', parsedArgs.import.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\DataSourceController::confirm
 * @see app/Http/Controllers/DataSourceController.php:121
 * @route '/dashboard/data/imports/{import}/confirm'
 */
confirm.post = (args: { import: number | { id: number } } | [importParam: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: confirm.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\DataSourceController::confirm
 * @see app/Http/Controllers/DataSourceController.php:121
 * @route '/dashboard/data/imports/{import}/confirm'
 */
    const confirmForm = (args: { import: number | { id: number } } | [importParam: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: confirm.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\DataSourceController::confirm
 * @see app/Http/Controllers/DataSourceController.php:121
 * @route '/dashboard/data/imports/{import}/confirm'
 */
        confirmForm.post = (args: { import: number | { id: number } } | [importParam: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: confirm.url(args, options),
            method: 'post',
        })
    
    confirm.form = confirmForm
const imports = {
    show: Object.assign(show, show),
confirm: Object.assign(confirm, confirm),
}

export default imports