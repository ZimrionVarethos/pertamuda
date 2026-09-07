import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
/**
* @see \App\Http\Controllers\PublicController::solution
 * @see app/Http/Controllers/PublicController.php:22
 * @route '/solusi'
 */
export const solution = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: solution.url(options),
    method: 'get',
})

solution.definition = {
    methods: ["get","head"],
    url: '/solusi',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PublicController::solution
 * @see app/Http/Controllers/PublicController.php:22
 * @route '/solusi'
 */
solution.url = (options?: RouteQueryOptions) => {
    return solution.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PublicController::solution
 * @see app/Http/Controllers/PublicController.php:22
 * @route '/solusi'
 */
solution.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: solution.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PublicController::solution
 * @see app/Http/Controllers/PublicController.php:22
 * @route '/solusi'
 */
solution.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: solution.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PublicController::solution
 * @see app/Http/Controllers/PublicController.php:22
 * @route '/solusi'
 */
    const solutionForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: solution.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PublicController::solution
 * @see app/Http/Controllers/PublicController.php:22
 * @route '/solusi'
 */
        solutionForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: solution.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PublicController::solution
 * @see app/Http/Controllers/PublicController.php:22
 * @route '/solusi'
 */
        solutionForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: solution.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    solution.form = solutionForm
/**
* @see \App\Http\Controllers\PublicController::methodology
 * @see app/Http/Controllers/PublicController.php:27
 * @route '/metodologi'
 */
export const methodology = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: methodology.url(options),
    method: 'get',
})

methodology.definition = {
    methods: ["get","head"],
    url: '/metodologi',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PublicController::methodology
 * @see app/Http/Controllers/PublicController.php:27
 * @route '/metodologi'
 */
methodology.url = (options?: RouteQueryOptions) => {
    return methodology.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PublicController::methodology
 * @see app/Http/Controllers/PublicController.php:27
 * @route '/metodologi'
 */
methodology.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: methodology.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PublicController::methodology
 * @see app/Http/Controllers/PublicController.php:27
 * @route '/metodologi'
 */
methodology.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: methodology.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PublicController::methodology
 * @see app/Http/Controllers/PublicController.php:27
 * @route '/metodologi'
 */
    const methodologyForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: methodology.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PublicController::methodology
 * @see app/Http/Controllers/PublicController.php:27
 * @route '/metodologi'
 */
        methodologyForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: methodology.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PublicController::methodology
 * @see app/Http/Controllers/PublicController.php:27
 * @route '/metodologi'
 */
        methodologyForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: methodology.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    methodology.form = methodologyForm
/**
* @see \App\Http\Controllers\PublicController::about
 * @see app/Http/Controllers/PublicController.php:32
 * @route '/tentang'
 */
export const about = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: about.url(options),
    method: 'get',
})

about.definition = {
    methods: ["get","head"],
    url: '/tentang',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PublicController::about
 * @see app/Http/Controllers/PublicController.php:32
 * @route '/tentang'
 */
about.url = (options?: RouteQueryOptions) => {
    return about.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PublicController::about
 * @see app/Http/Controllers/PublicController.php:32
 * @route '/tentang'
 */
about.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: about.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PublicController::about
 * @see app/Http/Controllers/PublicController.php:32
 * @route '/tentang'
 */
about.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: about.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PublicController::about
 * @see app/Http/Controllers/PublicController.php:32
 * @route '/tentang'
 */
    const aboutForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: about.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PublicController::about
 * @see app/Http/Controllers/PublicController.php:32
 * @route '/tentang'
 */
        aboutForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: about.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PublicController::about
 * @see app/Http/Controllers/PublicController.php:32
 * @route '/tentang'
 */
        aboutForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: about.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    about.form = aboutForm
/**
* @see \App\Http\Controllers\PublicController::pilotInterest
 * @see app/Http/Controllers/PublicController.php:42
 * @route '/pilot-interest'
 */
export const pilotInterest = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: pilotInterest.url(options),
    method: 'post',
})

pilotInterest.definition = {
    methods: ["post"],
    url: '/pilot-interest',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\PublicController::pilotInterest
 * @see app/Http/Controllers/PublicController.php:42
 * @route '/pilot-interest'
 */
pilotInterest.url = (options?: RouteQueryOptions) => {
    return pilotInterest.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PublicController::pilotInterest
 * @see app/Http/Controllers/PublicController.php:42
 * @route '/pilot-interest'
 */
pilotInterest.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: pilotInterest.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\PublicController::pilotInterest
 * @see app/Http/Controllers/PublicController.php:42
 * @route '/pilot-interest'
 */
    const pilotInterestForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: pilotInterest.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\PublicController::pilotInterest
 * @see app/Http/Controllers/PublicController.php:42
 * @route '/pilot-interest'
 */
        pilotInterestForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: pilotInterest.url(options),
            method: 'post',
        })
    
    pilotInterest.form = pilotInterestForm
/**
* @see \App\Http\Controllers\PublicController::privacy
 * @see app/Http/Controllers/PublicController.php:37
 * @route '/privasi'
 */
export const privacy = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: privacy.url(options),
    method: 'get',
})

privacy.definition = {
    methods: ["get","head"],
    url: '/privasi',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PublicController::privacy
 * @see app/Http/Controllers/PublicController.php:37
 * @route '/privasi'
 */
privacy.url = (options?: RouteQueryOptions) => {
    return privacy.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PublicController::privacy
 * @see app/Http/Controllers/PublicController.php:37
 * @route '/privasi'
 */
privacy.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: privacy.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PublicController::privacy
 * @see app/Http/Controllers/PublicController.php:37
 * @route '/privasi'
 */
privacy.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: privacy.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PublicController::privacy
 * @see app/Http/Controllers/PublicController.php:37
 * @route '/privasi'
 */
    const privacyForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: privacy.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PublicController::privacy
 * @see app/Http/Controllers/PublicController.php:37
 * @route '/privasi'
 */
        privacyForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: privacy.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PublicController::privacy
 * @see app/Http/Controllers/PublicController.php:37
 * @route '/privasi'
 */
        privacyForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: privacy.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    privacy.form = privacyForm
const publicMethod = {
    solution: Object.assign(solution, solution),
methodology: Object.assign(methodology, methodology),
about: Object.assign(about, about),
pilotInterest: Object.assign(pilotInterest, pilotInterest),
privacy: Object.assign(privacy, privacy),
}

export default publicMethod