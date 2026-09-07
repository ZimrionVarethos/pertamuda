import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
/**
* @see \App\Http\Controllers\PublicController::start
 * @see app/Http/Controllers/PublicController.php:63
 * @route '/demo/start'
 */
export const start = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: start.url(options),
    method: 'post',
})

start.definition = {
    methods: ["post"],
    url: '/demo/start',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\PublicController::start
 * @see app/Http/Controllers/PublicController.php:63
 * @route '/demo/start'
 */
start.url = (options?: RouteQueryOptions) => {
    return start.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PublicController::start
 * @see app/Http/Controllers/PublicController.php:63
 * @route '/demo/start'
 */
start.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: start.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\PublicController::start
 * @see app/Http/Controllers/PublicController.php:63
 * @route '/demo/start'
 */
    const startForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: start.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\PublicController::start
 * @see app/Http/Controllers/PublicController.php:63
 * @route '/demo/start'
 */
        startForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: start.url(options),
            method: 'post',
        })
    
    start.form = startForm
const demo = {
    start: Object.assign(start, start),
}

export default demo