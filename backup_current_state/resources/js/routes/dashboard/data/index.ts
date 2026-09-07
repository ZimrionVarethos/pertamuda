import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
import imports from './imports'
/**
* @see \App\Http\Controllers\DataSourceController::index
 * @see app/Http/Controllers/DataSourceController.php:22
 * @route '/dashboard/data'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/dashboard/data',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\DataSourceController::index
 * @see app/Http/Controllers/DataSourceController.php:22
 * @route '/dashboard/data'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DataSourceController::index
 * @see app/Http/Controllers/DataSourceController.php:22
 * @route '/dashboard/data'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\DataSourceController::index
 * @see app/Http/Controllers/DataSourceController.php:22
 * @route '/dashboard/data'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\DataSourceController::index
 * @see app/Http/Controllers/DataSourceController.php:22
 * @route '/dashboard/data'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\DataSourceController::index
 * @see app/Http/Controllers/DataSourceController.php:22
 * @route '/dashboard/data'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\DataSourceController::index
 * @see app/Http/Controllers/DataSourceController.php:22
 * @route '/dashboard/data'
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
* @see \App\Http\Controllers\DataSourceController::upload
 * @see app/Http/Controllers/DataSourceController.php:58
 * @route '/dashboard/data/upload'
 */
export const upload = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: upload.url(options),
    method: 'post',
})

upload.definition = {
    methods: ["post"],
    url: '/dashboard/data/upload',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\DataSourceController::upload
 * @see app/Http/Controllers/DataSourceController.php:58
 * @route '/dashboard/data/upload'
 */
upload.url = (options?: RouteQueryOptions) => {
    return upload.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DataSourceController::upload
 * @see app/Http/Controllers/DataSourceController.php:58
 * @route '/dashboard/data/upload'
 */
upload.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: upload.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\DataSourceController::upload
 * @see app/Http/Controllers/DataSourceController.php:58
 * @route '/dashboard/data/upload'
 */
    const uploadForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: upload.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\DataSourceController::upload
 * @see app/Http/Controllers/DataSourceController.php:58
 * @route '/dashboard/data/upload'
 */
        uploadForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: upload.url(options),
            method: 'post',
        })
    
    upload.form = uploadForm
/**
* @see \App\Http\Controllers\DataSourceController::template
 * @see app/Http/Controllers/DataSourceController.php:144
 * @route '/dashboard/data/template'
 */
export const template = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: template.url(options),
    method: 'get',
})

template.definition = {
    methods: ["get","head"],
    url: '/dashboard/data/template',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\DataSourceController::template
 * @see app/Http/Controllers/DataSourceController.php:144
 * @route '/dashboard/data/template'
 */
template.url = (options?: RouteQueryOptions) => {
    return template.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DataSourceController::template
 * @see app/Http/Controllers/DataSourceController.php:144
 * @route '/dashboard/data/template'
 */
template.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: template.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\DataSourceController::template
 * @see app/Http/Controllers/DataSourceController.php:144
 * @route '/dashboard/data/template'
 */
template.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: template.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\DataSourceController::template
 * @see app/Http/Controllers/DataSourceController.php:144
 * @route '/dashboard/data/template'
 */
    const templateForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: template.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\DataSourceController::template
 * @see app/Http/Controllers/DataSourceController.php:144
 * @route '/dashboard/data/template'
 */
        templateForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: template.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\DataSourceController::template
 * @see app/Http/Controllers/DataSourceController.php:144
 * @route '/dashboard/data/template'
 */
        templateForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: template.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    template.form = templateForm
const data = {
    index: Object.assign(index, index),
upload: Object.assign(upload, upload),
template: Object.assign(template, template),
imports: Object.assign(imports, imports),
}

export default data