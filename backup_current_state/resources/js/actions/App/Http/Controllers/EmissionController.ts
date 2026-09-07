import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\EmissionController::index
 * @see app/Http/Controllers/EmissionController.php:16
 * @route '/dashboard/emissions'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/dashboard/emissions',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\EmissionController::index
 * @see app/Http/Controllers/EmissionController.php:16
 * @route '/dashboard/emissions'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\EmissionController::index
 * @see app/Http/Controllers/EmissionController.php:16
 * @route '/dashboard/emissions'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\EmissionController::index
 * @see app/Http/Controllers/EmissionController.php:16
 * @route '/dashboard/emissions'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\EmissionController::index
 * @see app/Http/Controllers/EmissionController.php:16
 * @route '/dashboard/emissions'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\EmissionController::index
 * @see app/Http/Controllers/EmissionController.php:16
 * @route '/dashboard/emissions'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\EmissionController::index
 * @see app/Http/Controllers/EmissionController.php:16
 * @route '/dashboard/emissions'
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
const EmissionController = { index }

export default EmissionController