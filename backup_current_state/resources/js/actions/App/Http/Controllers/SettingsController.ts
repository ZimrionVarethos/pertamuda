import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
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
* @see \App\Http\Controllers\SettingsController::updateProfile
 * @see app/Http/Controllers/SettingsController.php:50
 * @route '/dashboard/settings/profile'
 */
export const updateProfile = (options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: updateProfile.url(options),
    method: 'patch',
})

updateProfile.definition = {
    methods: ["patch"],
    url: '/dashboard/settings/profile',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\SettingsController::updateProfile
 * @see app/Http/Controllers/SettingsController.php:50
 * @route '/dashboard/settings/profile'
 */
updateProfile.url = (options?: RouteQueryOptions) => {
    return updateProfile.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SettingsController::updateProfile
 * @see app/Http/Controllers/SettingsController.php:50
 * @route '/dashboard/settings/profile'
 */
updateProfile.patch = (options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: updateProfile.url(options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\SettingsController::updateProfile
 * @see app/Http/Controllers/SettingsController.php:50
 * @route '/dashboard/settings/profile'
 */
    const updateProfileForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: updateProfile.url({
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PATCH',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\SettingsController::updateProfile
 * @see app/Http/Controllers/SettingsController.php:50
 * @route '/dashboard/settings/profile'
 */
        updateProfileForm.patch = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: updateProfile.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    updateProfile.form = updateProfileForm
const SettingsController = { index, updateProfile }

export default SettingsController