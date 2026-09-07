import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\PublicController::home
 * @see app/Http/Controllers/PublicController.php:17
 * @route '/'
 */
export const home = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: home.url(options),
    method: 'get',
})

home.definition = {
    methods: ["get","head"],
    url: '/',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PublicController::home
 * @see app/Http/Controllers/PublicController.php:17
 * @route '/'
 */
home.url = (options?: RouteQueryOptions) => {
    return home.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PublicController::home
 * @see app/Http/Controllers/PublicController.php:17
 * @route '/'
 */
home.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: home.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PublicController::home
 * @see app/Http/Controllers/PublicController.php:17
 * @route '/'
 */
home.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: home.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PublicController::home
 * @see app/Http/Controllers/PublicController.php:17
 * @route '/'
 */
    const homeForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: home.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PublicController::home
 * @see app/Http/Controllers/PublicController.php:17
 * @route '/'
 */
        homeForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: home.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PublicController::home
 * @see app/Http/Controllers/PublicController.php:17
 * @route '/'
 */
        homeForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: home.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    home.form = homeForm
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
* @see \App\Http\Controllers\PublicController::storePilotInterest
 * @see app/Http/Controllers/PublicController.php:42
 * @route '/pilot-interest'
 */
export const storePilotInterest = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storePilotInterest.url(options),
    method: 'post',
})

storePilotInterest.definition = {
    methods: ["post"],
    url: '/pilot-interest',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\PublicController::storePilotInterest
 * @see app/Http/Controllers/PublicController.php:42
 * @route '/pilot-interest'
 */
storePilotInterest.url = (options?: RouteQueryOptions) => {
    return storePilotInterest.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PublicController::storePilotInterest
 * @see app/Http/Controllers/PublicController.php:42
 * @route '/pilot-interest'
 */
storePilotInterest.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storePilotInterest.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\PublicController::storePilotInterest
 * @see app/Http/Controllers/PublicController.php:42
 * @route '/pilot-interest'
 */
    const storePilotInterestForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: storePilotInterest.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\PublicController::storePilotInterest
 * @see app/Http/Controllers/PublicController.php:42
 * @route '/pilot-interest'
 */
        storePilotInterestForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: storePilotInterest.url(options),
            method: 'post',
        })
    
    storePilotInterest.form = storePilotInterestForm
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
/**
* @see \App\Http\Controllers\PublicController::startDemo
 * @see app/Http/Controllers/PublicController.php:63
 * @route '/demo/start'
 */
export const startDemo = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: startDemo.url(options),
    method: 'post',
})

startDemo.definition = {
    methods: ["post"],
    url: '/demo/start',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\PublicController::startDemo
 * @see app/Http/Controllers/PublicController.php:63
 * @route '/demo/start'
 */
startDemo.url = (options?: RouteQueryOptions) => {
    return startDemo.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PublicController::startDemo
 * @see app/Http/Controllers/PublicController.php:63
 * @route '/demo/start'
 */
startDemo.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: startDemo.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\PublicController::startDemo
 * @see app/Http/Controllers/PublicController.php:63
 * @route '/demo/start'
 */
    const startDemoForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: startDemo.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\PublicController::startDemo
 * @see app/Http/Controllers/PublicController.php:63
 * @route '/demo/start'
 */
        startDemoForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: startDemo.url(options),
            method: 'post',
        })
    
    startDemo.form = startDemoForm
const PublicController = { home, solution, methodology, about, storePilotInterest, privacy, startDemo }

export default PublicController