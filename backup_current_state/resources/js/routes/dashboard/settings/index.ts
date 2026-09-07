import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\SettingsController::index
 * @see app/Http/Controllers/SettingsController.php:14
 * @route '/dashboard/settings'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/dashboard/settings',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SettingsController::index
 * @see app/Http/Controllers/SettingsController.php:14
 * @route '/dashboard/settings'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SettingsController::index
 * @see app/Http/Controllers/SettingsController.php:14
 * @route '/dashboard/settings'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\SettingsController::index
 * @see app/Http/Controllers/SettingsController.php:14
 * @route '/dashboard/settings'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\SettingsController::index
 * @see app/Http/Controllers/SettingsController.php:14
 * @route '/dashboard/settings'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\SettingsController::index
 * @see app/Http/Controllers/SettingsController.php:14
 * @route '/dashboard/settings'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\SettingsController::index
 * @see app/Http/Controllers/SettingsController.php:14
 * @route '/dashboard/settings'
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
* @see \App\Http\Controllers\SettingsController::profile
 * @see app/Http/Controllers/SettingsController.php:50
 * @route '/dashboard/settings/profile'
 */
export const profile = (options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: profile.url(options),
    method: 'patch',
})

profile.definition = {
    methods: ["patch"],
    url: '/dashboard/settings/profile',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\SettingsController::profile
 * @see app/Http/Controllers/SettingsController.php:50
 * @route '/dashboard/settings/profile'
 */
profile.url = (options?: RouteQueryOptions) => {
    return profile.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SettingsController::profile
 * @see app/Http/Controllers/SettingsController.php:50
 * @route '/dashboard/settings/profile'
 */
profile.patch = (options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: profile.url(options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\SettingsController::profile
 * @see app/Http/Controllers/SettingsController.php:50
 * @route '/dashboard/settings/profile'
 */
    const profileForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: profile.url({
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PATCH',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\SettingsController::profile
 * @see app/Http/Controllers/SettingsController.php:50
 * @route '/dashboard/settings/profile'
 */
        profileForm.patch = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: profile.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    profile.form = profileForm
const settings = {
    index: Object.assign(index, index),
profile: Object.assign(profile, profile),
}

export default settings