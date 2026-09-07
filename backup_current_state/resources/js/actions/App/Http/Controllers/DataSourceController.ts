import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
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
* @see \App\Http\Controllers\DataSourceController::downloadTemplate
 * @see app/Http/Controllers/DataSourceController.php:144
 * @route '/dashboard/data/template'
 */
export const downloadTemplate = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: downloadTemplate.url(options),
    method: 'get',
})

downloadTemplate.definition = {
    methods: ["get","head"],
    url: '/dashboard/data/template',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\DataSourceController::downloadTemplate
 * @see app/Http/Controllers/DataSourceController.php:144
 * @route '/dashboard/data/template'
 */
downloadTemplate.url = (options?: RouteQueryOptions) => {
    return downloadTemplate.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DataSourceController::downloadTemplate
 * @see app/Http/Controllers/DataSourceController.php:144
 * @route '/dashboard/data/template'
 */
downloadTemplate.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: downloadTemplate.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\DataSourceController::downloadTemplate
 * @see app/Http/Controllers/DataSourceController.php:144
 * @route '/dashboard/data/template'
 */
downloadTemplate.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: downloadTemplate.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\DataSourceController::downloadTemplate
 * @see app/Http/Controllers/DataSourceController.php:144
 * @route '/dashboard/data/template'
 */
    const downloadTemplateForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: downloadTemplate.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\DataSourceController::downloadTemplate
 * @see app/Http/Controllers/DataSourceController.php:144
 * @route '/dashboard/data/template'
 */
        downloadTemplateForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: downloadTemplate.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\DataSourceController::downloadTemplate
 * @see app/Http/Controllers/DataSourceController.php:144
 * @route '/dashboard/data/template'
 */
        downloadTemplateForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: downloadTemplate.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    downloadTemplate.form = downloadTemplateForm
/**
* @see \App\Http\Controllers\DataSourceController::showImport
 * @see app/Http/Controllers/DataSourceController.php:79
 * @route '/dashboard/data/imports/{import}'
 */
export const showImport = (args: { import: number | { id: number } } | [importParam: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: showImport.url(args, options),
    method: 'get',
})

showImport.definition = {
    methods: ["get","head"],
    url: '/dashboard/data/imports/{import}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\DataSourceController::showImport
 * @see app/Http/Controllers/DataSourceController.php:79
 * @route '/dashboard/data/imports/{import}'
 */
showImport.url = (args: { import: number | { id: number } } | [importParam: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return showImport.definition.url
            .replace('{import}', parsedArgs.import.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\DataSourceController::showImport
 * @see app/Http/Controllers/DataSourceController.php:79
 * @route '/dashboard/data/imports/{import}'
 */
showImport.get = (args: { import: number | { id: number } } | [importParam: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: showImport.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\DataSourceController::showImport
 * @see app/Http/Controllers/DataSourceController.php:79
 * @route '/dashboard/data/imports/{import}'
 */
showImport.head = (args: { import: number | { id: number } } | [importParam: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: showImport.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\DataSourceController::showImport
 * @see app/Http/Controllers/DataSourceController.php:79
 * @route '/dashboard/data/imports/{import}'
 */
    const showImportForm = (args: { import: number | { id: number } } | [importParam: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: showImport.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\DataSourceController::showImport
 * @see app/Http/Controllers/DataSourceController.php:79
 * @route '/dashboard/data/imports/{import}'
 */
        showImportForm.get = (args: { import: number | { id: number } } | [importParam: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: showImport.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\DataSourceController::showImport
 * @see app/Http/Controllers/DataSourceController.php:79
 * @route '/dashboard/data/imports/{import}'
 */
        showImportForm.head = (args: { import: number | { id: number } } | [importParam: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: showImport.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    showImport.form = showImportForm
/**
* @see \App\Http\Controllers\DataSourceController::confirmImport
 * @see app/Http/Controllers/DataSourceController.php:121
 * @route '/dashboard/data/imports/{import}/confirm'
 */
export const confirmImport = (args: { import: number | { id: number } } | [importParam: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: confirmImport.url(args, options),
    method: 'post',
})

confirmImport.definition = {
    methods: ["post"],
    url: '/dashboard/data/imports/{import}/confirm',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\DataSourceController::confirmImport
 * @see app/Http/Controllers/DataSourceController.php:121
 * @route '/dashboard/data/imports/{import}/confirm'
 */
confirmImport.url = (args: { import: number | { id: number } } | [importParam: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return confirmImport.definition.url
            .replace('{import}', parsedArgs.import.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\DataSourceController::confirmImport
 * @see app/Http/Controllers/DataSourceController.php:121
 * @route '/dashboard/data/imports/{import}/confirm'
 */
confirmImport.post = (args: { import: number | { id: number } } | [importParam: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: confirmImport.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\DataSourceController::confirmImport
 * @see app/Http/Controllers/DataSourceController.php:121
 * @route '/dashboard/data/imports/{import}/confirm'
 */
    const confirmImportForm = (args: { import: number | { id: number } } | [importParam: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: confirmImport.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\DataSourceController::confirmImport
 * @see app/Http/Controllers/DataSourceController.php:121
 * @route '/dashboard/data/imports/{import}/confirm'
 */
        confirmImportForm.post = (args: { import: number | { id: number } } | [importParam: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: confirmImport.url(args, options),
            method: 'post',
        })
    
    confirmImport.form = confirmImportForm
const DataSourceController = { index, upload, downloadTemplate, showImport, confirmImport }

export default DataSourceController