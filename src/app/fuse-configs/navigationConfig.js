
const navigationConfig = [
    {
        'id'      : 'applications',
        'title'   : 'Services_and_Products',
        'type'    : 'group',
        'icon'    : 'apps',
        'children': [ 
            {  
                'id'   : 'analytics-dashboard',
                'title': 'dashboard',
                'type' : 'item',
                'url'  : '/apps/dashboards/analytics'
            },  
            {
                'id'      : 'dashboards',
                'title'   : 'Managerial_reports',
                'type'    : 'collapse',
                'icon'    : 'dashboard',
                'children': [                   
                    {
                        'id'   : 'project-dashboard',
                        'title': 'Project_Management',
                        'type' : 'item',
                        'url'  : '/apps/dashboards/project'
                    }, {
                        'id'   : 'calendar',
                        'title': 'calendar',
                        'type' : 'item',
                        'icon' : 'today',
                        'url'  : '/apps/calendar'
                     },
                ]
            }
       ]
	} ,
	{
        'id'      : 'e-commerce3',
        'title'   : 'Product_and_Products',
        'type'    : 'collapse',
        'icon'    : 'shopping_cart',
        'url'     : '/apps/e-commerce',
        'children': [
            {
                'id'   : 'e-commerce-products',
                'title': 'product_list',
                'type' : 'item',
                'url'  : '/apps/e-commerce/products',
                'exact': true
            },
            {
                'id'   : 'e-commerce-cluster-products',
                'title': 'products',
                'type' : 'item',
                'url'  : '/apps/e-commerce/clusterProduct',
                //'exact': true
            },
            {
                'id'   : 'e-commerce-new-product',
                'title': 'new_product',
                'type' : 'item',
                'url'  : '/apps/e-commerce/products/new',
                'exact': true
			},
            {
                'id'   : 'tree-category',
                'title': 'Tree_Category',
                'type' : 'item',
                'url'  : '/apps/e-commerce/tree-category',
                'exact': true
            },	 
            {
                'id'   : 'category',
                'title': 'Categories',
                'type' : 'collapse',
                'icon' : 'category',
                'children': [
                   // {
                   //      'id'   : 'categories',
                   //      'title': 'Category',
                   //      'type' : 'item',
                   //      'url'  : '/apps/categories',
                   // },
                   {
                        'id'   : 'categoryLabels',
                        'title': 'Category_Labels',
                        'type' : 'item',
                        'url'  : '/apps/category/labels',
                   }                   
                ]
            },             
        ]
    },
    {
                'id'   : 'property',
                'title': 'Product_Properties',
                'type' : 'collapse',
                'icon' : 'highlight',
                'children': [
                    {
                        'id'   : 'properties',
                        'title': 'Properties',
                        'type' : 'item',
                        'url'  : '/apps/properties',
                    },
                    {
                        'id'   : 'propertyLabels',
                        'title': 'Property_Labels',
                        'type' : 'item',
                        'url'  : '/apps/property/labels',
                    }                   
                ]
    },  


    {
        'id'      : 'e-commerce',
        'title'   : 'Orders_and_Products',
        'type'    : 'collapse',
        'icon'    : 'shopping_cart',
        'url'     : '/apps/e-commerce',
        'children': [ 
            {
                'id'   : 'e-commerce-orders',
                'title': 'order_list',
                'type' : 'item',
                'url'  : '/apps/e-commerce/orders',
                'exact': true
            },                   
            {
                'id'   : 'e-commerce-orders-map',
                'title': 'orders_map',
                'type' : 'item',
                'url'  : '/apps/e-commerce/orders-map',
                'exact': true
            },                    
            {
                'id'   : 'e-commerce-orders-status',
                'title': 'Status',
                'type' : 'item',
                'url'  : '/apps/e-commerce/orders-status/labels/all',
                'exact': true
            }, 
      ]
    }, {
        'id'      : 'e-commerce2',
        'title'   : 'Warranty_and_Products',
        'type'    : 'collapse',
        'icon'    : 'shopping_cart',
        'url'     : '/apps/e-commerce',
        'children': [ 
            {
                'id'   : 'e-commerce-warrantylist',
                'title': 'warrantylist',
                'type' : 'item',
                'url'  : '/apps/e-commerce/warrantylist',
            },  
            {
                'id'   : 'e-commerce-warrantylist-status',
                'title': 'StatusWarrantylist',
                'type' : 'item',
                'url'  : '/apps/e-commerce/warrantylist-status/labels/all',
            }, 
        ]
    },{
        'id'      : 'courseinfo',
        'title'   : 'courseinfo',
        'type'    : 'collapse',
        'icon'    : 'shopping_cart',
        'url'     : '/apps/kandida',
        'children': [
           {
                'id'   : 'course-posts',
                'title': 'courseList',
                'type' : 'item',
                'url'  : '/apps/course/posts',
                'exact': true
            },
            {
                'id'   : 'course-new-post',
                'title': 'New_course',
                'type' : 'item',
                'url'  : '/apps/course/posts/new',
                'exact': true
            },
            {
                'id'   : 'category',
                'title': 'Categories',
                'type' : 'collapse',
                'icon' : 'category',
                'children': [
                   {
                        'id'   : 'categories',
                        'title': 'Category',
                        'type' : 'item',
                        'url'  : '/apps/course-categories',
                   },
                   {
                        'id'   : 'categoryLabels',
                        'title': 'Category_Labels',
                        'type' : 'item',
                        'url'  : '/apps/course-category',
                   }                   
                ]
            },
        ]
    },{
        'id'      : 'etelafinfo',
        'title'   : 'etelafinfo',
        'type'    : 'collapse',
        'icon'    : 'shopping_cart',
        'url'     : '/apps/kandida',
        'children': [
           {
                'id'   : 'etelaf-posts',
                'title': 'etelafList',
                'type' : 'item',
                'url'  : '/apps/etelaf/posts',
                'exact': true
            },
            {
                'id'   : 'etelaf-new-post',
                'title': 'New_etelaf',
                'type' : 'item',
                'url'  : '/apps/etelaf/posts/new',
                'exact': true
            },
            {
                'id'   : 'category',
                'title': 'Categories',
                'type' : 'collapse',
                'icon' : 'category',
                'children': [
                   {
                        'id'   : 'categories',
                        'title': 'Category',
                        'type' : 'item',
                        'url'  : '/apps/etelaf-categories',
                   },
                   {
                        'id'   : 'categoryLabels',
                        'title': 'Category_Labels',
                        'type' : 'item',
                        'url'  : '/apps/etelaf-category',
                   }                   
                ]
            },
        ]
    },{
        'id'      : 'ideainfo',
        'title'   : 'ideainfo',
        'type'    : 'collapse',
        'icon'    : 'shopping_cart',
        'url'     : '/apps/kandida',
        'children': [
           {
                'id'   : 'idea-posts',
                'title': 'ideaList',
                'type' : 'item',
                'url'  : '/apps/idea/posts',
                'exact': true
            },
            {
                'id'   : 'idea-new-post',
                'title': 'New_idea',
                'type' : 'item',
                'url'  : '/apps/idea/posts/new',
                'exact': true
            },
            {
                'id'   : 'category',
                'title': 'Categories',
                'type' : 'collapse',
                'icon' : 'category',
                'children': [
                   {
                        'id'   : 'categories',
                        'title': 'Category',
                        'type' : 'item',
                        'url'  : '/apps/idea-categories',
                   },
                   {
                        'id'   : 'categoryLabels',
                        'title': 'Category_Labels',
                        'type' : 'item',
                        'url'  : '/apps/idea-category',
                   }                   
                ]
            },
        ]
    },{
        'id'      : 'kandidainfo',
        'title'   : 'kandidainfo',
        'type'    : 'collapse',
        'icon'    : 'shopping_cart',
        'url'     : '/apps/kandida',
        'children': [
           {
                'id'   : 'kandida-posts',
                'title': 'kandidaList',
                'type' : 'item',
                'url'  : '/apps/kandida/posts',
                'exact': true
            },
            {
                'id'   : 'kandida-new-post',
                'title': 'New_kandida',
                'type' : 'item',
                'url'  : '/apps/kandida/posts/new',
                'exact': true
            },
            {
                'id'   : 'category',
                'title': 'Categories',
                'type' : 'collapse',
                'icon' : 'category',
                'children': [
                   {
                        'id'   : 'categories',
                        'title': 'Category',
                        'type' : 'item',
                        'url'  : '/apps/kandida-categories',
                   },
                   {
                        'id'   : 'categoryLabels',
                        'title': 'Category_Labels',
                        'type' : 'item',
                        'url'  : '/apps/kandida-category',
                   }                   
                ]
            },
        ]
    },{
        'id'      : 'newsinfo',
        'title'   : 'newsinfo',
        'type'    : 'collapse',
        'icon'    : 'shopping_cart',
        'url'     : '/apps/news',
        'children': [
           {
                'id'   : 'news-posts',
                'title': 'newsList',
                'type' : 'item',
                'url'  : '/apps/news/posts',
                'exact': true
            },
            {
                'id'   : 'news-new-post',
                'title': 'New_news',
                'type' : 'item',
                'url'  : '/apps/news/posts/new',
                'exact': true
            },
            {
                'id'   : 'category',
                'title': 'Categories',
                'type' : 'collapse',
                'icon' : 'category',
                'children': [
                   {
                        'id'   : 'categories',
                        'title': 'Category',
                        'type' : 'item',
                        'url'  : '/apps/news-categories',
                   },
                   {
                        'id'   : 'categoryLabels',
                        'title': 'Category_Labels',
                        'type' : 'item',
                        'url'  : '/apps/news-category',
                   }                   
                ]
            },
        ]
    },{
        'id'      : 'tourisminfo',
        'title'   : 'tourisminfo',
        'type'    : 'collapse',
        'icon'    : 'shopping_cart',
        'url'     : '/apps/tourism',
        'children': [
           {
                'id'   : 'tourism-posts',
                'title': 'tourismList',
                'type' : 'item',
                'url'  : '/apps/tourism/posts',
                'exact': true
            },
            {
                'id'   : 'tourism-new-post',
                'title': 'New_tourism',
                'type' : 'item',
                'url'  : '/apps/tourism/posts/new',
                'exact': true
            },
            {
                'id'   : 'category',
                'title': 'Categories',
                'type' : 'collapse',
                'icon' : 'category',
                'children': [
                   {
                        'id'   : 'categories',
                        'title': 'Category',
                        'type' : 'item',
                        'url'  : '/apps/tourism-categories',
                   },
                   {
                        'id'   : 'categoryLabels',
                        'title': 'Category_Labels',
                        'type' : 'item',
                        'url'  : '/apps/tourism-category',
                   }                   
                ]
            },
        ]
     },{
        'id'      : 'tradepageinfo',
        'title'   : 'tradepageinfo',
        'type'    : 'collapse',
        'icon'    : 'shopping_cart',
        'url'     : '/apps/tradepage',
        'children': [
           {
                'id'   : 'tradepage-posts',
                'title': 'tradepageList',
                'type' : 'item',
                'url'  : '/apps/tradepage/posts',
                'exact': true
            },
            {
                'id'   : 'tradepage-new-post',
                'title': 'New_tradepage',
                'type' : 'item',
                'url'  : '/apps/tradepage/posts/new',
                'exact': true
            },
            {
                'id'   : 'category',
                'title': 'CategoriesModal',
                'type' : 'collapse',
                'icon' : 'category',
                'children': [
                   {
                        'id'   : 'categories',
                        'title': 'CategoryModal',
                        'type' : 'item',
                        'url'  : '/apps/tradepage-categories',
                   },
                   {
                        'id'   : 'categoryLabels',
                        'title': 'Category_LabelsModal',
                        'type' : 'item',
                        'url'  : '/apps/tradepage-category',
                   }                   
                ]
            },
        ]
    },{
        'id'      : 'galleryinfo',
        'title'   : 'galleryinfo',
        'type'    : 'collapse',
        'icon'    : 'shopping_cart',
        'url'     : '/apps/gallery',
        'children': [
           {
                'id'   : 'gallery-posts',
                'title': 'galleryList',
                'type' : 'item',
                'url'  : '/apps/gallery/posts',
                'exact': true
            },
            {
                'id'   : 'gallery-new-post',
                'title': 'New_gallery',
                'type' : 'item',
                'url'  : '/apps/gallery/posts/new',
                'exact': true
            },
            {
                'id'   : 'category',
                'title': 'Categories',
                'type' : 'collapse',
                'icon' : 'category',
                'children': [
                   {
                        'id'   : 'categories',
                        'title': 'Category',
                        'type' : 'item',
                        'url'  : '/apps/gallery-categories',
                   },
                   {
                        'id'   : 'categoryLabels',
                        'title': 'Category_Labels',
                        'type' : 'item',
                        'url'  : '/apps/gallery-category',
                   }                   
                ]
            },
        ]
    },


























     {
        'id'      : 'immerse-me',
        'title'   : 'Immerse_Me',
        'type'    : 'collapse',
        'icon'    : 'language',
        'url'     : '/apps/immerse-me',
        'children': [
            {
                'id'   : 'immerse-me-products',
                'title': 'Lessons',
                'type' : 'item',
                'url'  : '/apps/e-immerse/immerse-me/products',
                'exact': true
            },
            {
                'id'   : 'immerse-me-new-product',
                'title': 'New_Lesson',
                'type' : 'item',
                'url'  : '/apps/e-immerse/immerse-me/products/new',
                'exact': true
            }, 
            {
                'id'   : 'category',
                'title': 'Categories',
                'type' : 'collapse',
                'icon' : 'category',
                'children': [
                   {
                        'id'   : 'categories',
                        'title': 'Category',
                        'type' : 'item',
                        'url'  : '/apps/e-immerse/immerse-categories',
                   },
                   {
                        'id'   : 'categoryLabels',
                        'title': 'Category_Labels',
                        'type' : 'item',
                        'url'  : '/apps/e-immerse/immerse-category/labels',
                   }                   
                ]
            },
            {
                'id'   : 'property',
                'title': 'Lesson_Properties',
                'type' : 'collapse',
                'icon' : 'highlight',
                'children': [
                    {
                        'id'   : 'properties',
                        'title': 'Properties',
                        'type' : 'item',
                        'url'  : '/apps/e-immerse/immerse-properties',
                    },
                    {
                        'id'   : 'propertyLabels',
                        'title': 'Property_Labels',
                        'type' : 'item',
                        'url'  : '/apps/e-immerse/immerse-property/labels',
                    }                   
                ]
            }, 			
        ]
    },
	{
        'id'      : 'english-skill',
        'title'   : 'English_Skill',
        'type'    : 'collapse',
        'icon'    : 'language',
        'url'     : '/apps/e-immerse/english-skill',
        'children': [
            {
                'id'   : 'english-skill-products',
                'title': 'Lessons',
                'type' : 'item',
                'url'  : '/apps/e-immerse/english-skill/products',
                'exact': true
            },
            {
                'id'   : 'english-skill-new-product',
                'title': 'New_Lesson',
                'type' : 'item',
                'url'  : '/apps/e-immerse/english-skill/products/new',
                'exact': true
            },
            {
                'id'   : 'category',
                'title': 'Categories',
                'type' : 'collapse',
                'icon' : 'category',
                'children': [
                   {
                        'id'   : 'categories',
                        'title': 'Category',
                        'type' : 'item',
                        'url'  : '/apps/e-immerse/english-skill-categories',
                   },
                   {
                        'id'   : 'categoryLabels',
                        'title': 'Category_Labels',
                        'type' : 'item',
                        'url'  : '/apps/e-immerse/english-skill-category/labels',
                   }                   
                ]
            },
            {
                'id'   : 'property',
                'title': 'Lesson_Properties',
                'type' : 'collapse',
                'icon' : 'highlight',
                'children': [
                    {
                        'id'   : 'properties',
                        'title': 'Properties',
                        'type' : 'item',
                        'url'  : '/apps/e-immerse/english-skill-properties',
                    },
                    {
                        'id'   : 'propertyLabels',
                        'title': 'Property_Labels',
                        'type' : 'item',
                        'url'  : '/apps/e-immerse/english-skill-property/labels',
                    }                   
                ]
            }, 			
        ],		
    },
	{
        'id'      : 'im-tv',
        'title'   : 'Im_Tv',
        'type'    : 'collapse',
        'icon'    : 'language',
        'url'     : '/apps/e-immerse/im-tv',
        'children': [
            {
                'id'   : 'im-tv-products',
                'title': 'Lessons',
                'type' : 'item',
                'url'  : '/apps/e-immerse/im-tv/products',
                'exact': true
            },
            {
                'id'   : 'im-tv-new-product',
                'title': 'New_Lesson',
                'type' : 'item',
                'url'  : '/apps/e-immerse/im-tv/products/new',
                'exact': true
            }, 
            {
                'id'   : 'category',
                'title': 'Categories',
                'type' : 'collapse',
                'icon' : 'category',
                'children': [
                   {
                        'id'   : 'categories',
                        'title': 'Category',
                        'type' : 'item',
                        'url'  : '/apps/e-immerse/imtv-categories',
                   },
                   {
                        'id'   : 'categoryLabels',
                        'title': 'Category_Labels',
                        'type' : 'item',
                        'url'  : '/apps/e-immerse/imtv-category/labels',
                   }                   
                ]
            },
            {
                'id'   : 'property',
                'title': 'Lesson_Properties',
                'type' : 'collapse',
                'icon' : 'highlight',
                'children': [
                    {
                        'id'   : 'properties',
                        'title': 'Properties',
                        'type' : 'item',
                        'url'  : '/apps/e-immerse/imtv-properties',
                    },
                    {
                        'id'   : 'propertyLabels',
                        'title': 'Property_Labels',
                        'type' : 'item',
                        'url'  : '/apps/e-immerse/imtv-property/labels',
                    }                   
                ]
            }			
        ]
    },	
	{
        'id'      : 'blog',
        'title'   : 'blog',
        'type'    : 'collapse',
        'icon'    : 'view_quilt',
        'url'     : '/apps/blog',
        'children': [
            {
                'id'   : 'blog-posts',
                'title': 'Posts',
                'type' : 'item',
                'url'  : '/apps/blog/posts',
                'exact': true
            },
            {
                'id'   : 'blog-new-post',
                'title': 'New_post',
                'type' : 'item',
                'url'  : '/apps/blog/posts/new',
                'exact': true
            }, 
            {
                'id'   : 'category',
                'title': 'Categories',
                'type' : 'collapse',
                'icon' : 'category',
                'children': [
                   {
                        'id'   : 'categories',
                        'title': 'Category',
                        'type' : 'item',
                        'url'  : '/apps/blog-categories',
                   },
                   {
                        'id'   : 'categoryLabels',
                        'title': 'Category_Labels',
                        'type' : 'item',
                        'url'  : '/apps/blog-category',
                   }                   
                ]
            },			
        ]
    },	{
        'id'      : 'ads',
        'title'   : 'ads',
        'type'    : 'collapse',
        'icon'    : 'view_quilt',
        'url'     : '/apps/ads',
        'children': [
            {
                'id'   : 'ads-posts',
                'title': 'adsList',
                'type' : 'item',
                'url'  : '/apps/ads/posts',
                'exact': true
            },
            {
                'id'   : 'ads-new-post',
                'title': 'New_ads',
                'type' : 'item',
                'url'  : '/apps/ads/posts/new',
                'exact': true
            }, 
            {
                'id'   : 'category',
                'title': 'Categories',
                'type' : 'collapse',
                'icon' : 'category',
                'children': [
                   {
                        'id'   : 'categories',
                        'title': 'Category',
                        'type' : 'item',
                        'url'  : '/apps/ads-categories',
                   },
                   {
                        'id'   : 'categoryLabels',
                        'title': 'Category_Labels',
                        'type' : 'item',
                        'url'  : '/apps/ads-category',
                   }                   
                ]
            },          
        ]
    },  
        {
        'id'      : 'camera',
        'title'   : 'camera',
        'type'    : 'collapse',
        'icon'    : 'view_quilt',
        'url'     : '/apps/camera',
        'children': [
            {
                'id'   : 'camera-posts',
                'title': 'cameraList',
                'type' : 'item',
                'url'  : '/apps/camera/posts',
                'exact': true
            },
            {
                'id'   : 'camera-new-post',
                'title': 'New_camera',
                'type' : 'item',
                'url'  : '/apps/camera/posts/new',
                'exact': true
            }, 
            {
                'id'   : 'category',
                'title': 'Categories',
                'type' : 'collapse',
                'icon' : 'category',
                'children': [
                   {
                        'id'   : 'categories',
                        'title': 'Category',
                        'type' : 'item',
                        'url'  : '/apps/camera-categories',
                   },
                   {
                        'id'   : 'categoryLabels',
                        'title': 'Category_Labels',
                        'type' : 'item',
                        'url'  : '/apps/camera-category',
                   }                   
                ]
            },          
        ]
    },  {
        'id'      : 'bookstore',
        'title'   : 'bookstore',
        'type'    : 'collapse',
        'icon'    : 'view_quilt',
        'url'     : '/apps/bookstore',
        'children': [
            {
                'id'   : 'bookstore-posts',
                'title': 'bookstoreList', 
                'type' : 'item',
                'url'  : '/apps/bookstore/posts',
                'exact': true
            },
            {
                'id'   : 'bookstore-new-post',
                'title': 'New_bookstore',
                'type' : 'item',
                'url'  : '/apps/bookstore/posts/new',
                'exact': true
            }, 
            {
                'id'   : 'category',
                'title': 'Categories',
                'type' : 'collapse',
                'icon' : 'category',
                'children': [
                   {
                        'id'   : 'categories',
                        'title': 'Category',
                        'type' : 'item',
                        'url'  : '/apps/bookstore-categories',
                   },
                   {
                        'id'   : 'categoryLabels',
                        'title': 'Category_Labels',
                        'type' : 'item',
                        'url'  : '/apps/bookstore-category',
                   }                   
                ]
            },          
        ]
    },
    {
        'id'      : 'accountinfo',
        'title'   : 'Account_Info',
        'type'    : 'group',
        'icon'    : 'pages',
        'children': [
            {
                'id'      : 'account',
                'title'   : 'Account',
                'type'    : 'collapse',
                'icon'    : 'account',
                'children': [ 
                    {
                        'id'   : 'transaction',
                        'title': 'Transaction',
                        'type' : 'item',
                        'icon' : 'attach_money',
                        'url'  : '/apps/transaction/credit'
                    },              
                    {             
                        'id'   : 'invoicelist',
                        'title': 'Invoice_List',
                        'type' : 'item',
                        'icon' : 'business',
                        'url'  : '/apps/invoicelist'
                    },          
                    {             
                        'id'   : 'transactionlist',
                        'title': 'Transaction_List',
                        'type' : 'item',
                        'icon' : 'business',
                        'url'  : '/apps/transaction/list'
                    },  
                    {
                        'id'   : 'e-account-accdocs',
                      'title': 'accdocs',
                      'type' : 'item',
                      'url'  : '/apps/e-account/accdocs',
                     },  
                    {
                      'id'   : 'e-account-accdocs-status',
                      'title': 'StatusAccdocs',
                      'type' : 'item',
                      'url'  : '/apps/e-account/accdocs-status/labels/all',
                    },   
              {
                'id'   : 'category',
                'title': 'accCategories',
                'type' : 'collapse',
                'icon' : 'category',
                'children': [
                   {
                        'id'   : 'acccategories',
                        'title': 'accCategory',
                        'type' : 'item',
                        'url'  : '/apps/acc-categories',
                   },
                   {
                        'id'   : 'acc-categoryLabels',
                        'title': 'accCategory_Labels',
                        'type' : 'item',
                        'url'  : '/apps/acc-category/labels',
                   }                   
                ]
            },  
            {
                'id'   : 'property',
                'title': 'accProduct_Properties',
                'type' : 'collapse',
                'icon' : 'highlight',
                'children': [
                    {
                        'id'   : 'accproperties',
                        'title': 'accProperties',
                        'type' : 'item',
                        'url'  : '/apps/acc-properties',
                    },
                    {
                        'id'   : 'acc-propertyLabels',
                        'title': 'accProperty_Labels',
                        'type' : 'item',
                        'url'  : '/apps/acc-property/labels',
                    }                   
                  ]
               }, 

                ]
            },
             
        ]
    },  

    {      //-------add-maddahi --------
		'id'      : 'crm',
		'title'   : 'crm_info',
		'type'    : 'group',
		'icon'    : 'pages',
		'children': [
			{
				'id'      : 'dashboards',
				'title'   : 'Dashboards',
				'type'    : 'collapse',
				'icon'    : 'dashboard',
				'children': [
					{
						'id'   : 'academy',
						'title': 'Academy',
						'type' : 'item',
						'icon' : 'school',
						'url'  : '/apps/academy'
					},
					{
						'id'   : 'mail',
						'title': 'Mail',
						'type' : 'item',
						'icon' : 'email',
						'url'  : '/apps/mail',
						'badge': {
							'title': 25,
							'bg'   : '#F44336',
							'fg'   : '#FFFFFF'
						}
					},
					{
						'id'   : 'todo',
						'title': 'Todo',
						'type' : 'item',
						'icon' : 'check_box',
						'url'  : '/apps/todo',
						'badge': {
							'title': 3,
							'bg'   : 'rgb(255, 111, 0)',
							'fg'   : '#FFFFFF'
						}
					},
					{
						'id'   : 'file-manager',
						'title': 'File_Manager',
						'type' : 'item',
						'icon' : 'folder',
						'url'  : '/apps/file-manager'
					},
					{
						'id'   : 'contacts',
						'title': 'Contacts',
						'type' : 'item',
						'icon' : 'account_box',
						'url'  : '/apps/contacts/all'
					},
					{
						'id'   : 'chat',
						'title': 'Chat',
						'type' : 'item',
						'icon' : 'chat',
						'url'  : '/apps/chat',
						'badge': {
							'title': 13,
							'bg'   : 'rgb(9, 210, 97)',
							'fg'   : '#FFFFFF'
						}
					},
					{
						'id'   : 'scrumboard',
						'title': 'Scrumboard',
						'type' : 'item',
						'icon' : 'assessment',
						'url'  : '/apps/scrumboard'
					},
					{
						'id'   : 'notes',
						'title': 'Notes',
						'type' : 'item',
						'icon' : 'note',
						'url'  : '/apps/notes'
					},  
				]
			}
		] 
	},
	{
        'id'      : 'mainconfiguration',
        'title'   : 'Settings',
        'type'    : 'group',
        'icon'    : 'pages',
        'children': [
            {
               'id'      : 'settingInfo',
               'title'   : 'SettingsInfo',
               'type'    : 'collapse',
               'icon'    : 'setting',
               'children': [
                   {
                        'id'   : 'cataloglist',
                        'title': 'Cataloglist',
                        'type' : 'item', 
                        'icon' : 'slideshow',
                        'url'  : '/apps/cataloglist'
                    },
                    {
                        'id'   : 'werehouselist',
                        'title': 'Werehouselist',
                        'type' : 'item', 
                        'icon' : 'slideshow',
                        'url'  : '/apps/werehouselist'
                    },
                    {
                        'id'   : 'vehicletypelist',
                        'title': 'Vehicletypelist',
                        'type' : 'item', 
                        'icon' : 'slideshow',
                        'url'  : '/apps/vehicletypelist'
                    },
                    {
                        'id'   : 'warrantycodes',
                        'title': 'Warrantycodes',
                        'type' : 'item', 
                        'icon' : 'slideshow',
                        'url'  : '/apps/warrantycodes'
                    },  {
                        'id'   : 'discount-code',
                        'title': 'discount_code',
                        'type' : 'item',
                        'icon' : 'money_off',
                        'url'  : '/apps/discount/discounts',
                        'exact': true
                    },  {             
                        'id'   : 'Masters',
                        'title': 'Masters',
                        'type' : 'item',
                        'icon' : 'business',
                        'url'  : '/apps/master'
                    },          
                     {             
                        'id'   : 'Companies',
                        'title': 'Companies',
                        'type' : 'item',
                        'icon' : 'business',
                        'url'  : '/apps/company'
                    }, {
                        'id'   : 'Address',
                        'title': 'Addresses',
                        'type' : 'item',
                        'icon' : 'add_location',
                        'url'  : '/apps/address/labels/all'
                    }, 
                ]
            },
			{
               'id'      : 'setting',
               'title'   : 'Settings',
               'type'    : 'collapse',
               'icon'    : 'setting',
               'children': [
                    {
                        'id'   : 'settings',
                        'title': 'Settings',
                        'type' : 'item',
                        'icon' : 'settings_applications',
                        'url'  : '/apps/settings'
                    },	
                    {
                        'id'   : 'types',
                        'title': 'Types',
                        'type' : 'item',
                        'icon' : 'merge_type',
                        'url'  : '/apps/types'
                    },	 {
                        'id'   : 'sliders',
                        'title': 'Sliders',
                        'type' : 'item', 
                        'icon' : 'slideshow',
                        'url'  : '/apps/sliders'
                    },				
                    {
                        'id'   : 'panels',
                        'title': 'Panel_Translate',
                        'type' : 'item',
                        'icon' : 'translate',
                        'url'  : '/apps/panels'
                    },	
                    {
                        'id'   : 'shops',
                        'title': 'Store_Translate',
                        'type' : 'item',
                        'icon' : 'translate',
                        'url'  : '/apps/shops'
                    },
                    {
                        'id'   : 'otherpages',
                        'title': 'Otherpages',
                        'type' : 'item',
                        'icon' : 'slideshow',
                        'url'  : '/apps/otherpages'
                    },
                    {
                        'id'   : 'gateways',
                        'title': 'Gateways',
                        'type' : 'item',
                        'icon' : 'payment',
                        'url'  : '/apps/gateways'
                    },				
                    {             
                        'id'   : 'cities',
                        'title': 'Cities',
                        'type' : 'item',
                        'icon' : 'my_location',
                        'url'  : '/apps/place'
                    },   {
                        'id'   : 'gatewaysms',
                        'title': 'Gatewaysms',
                        'type' : 'item',
                        'icon' : 'slideshow',
                        'url'  : '/apps/gatewaysms'
                    },       
					{
						'id'   : 'Language',
						'title': 'Languages',
						'type' : 'item',
						'icon' : 'language',
						'url'  : '/apps/language'
					},          
					{
						'id'   : 'users-managment',
						'title': 'User_Managment',
						'type' : 'item',
						'icon' : 'supervised_user_circle',
						'url'  : '/apps/users/managment'
					} ,          
                    {
                        'id'   : 'sysroles-managment',
                        'title': 'Sysole_Managment',
                        'type' : 'item',
                        'icon' : 'supervised_user_circle',
                        'url'  : '/apps/sysroles/managment'
                    } 
          
				]
			},
			{
				'id'      : 'baseinfo',
				'title'   : 'Base_Info',
				'type'    : 'collapse',
				'icon'    : 'pages',
				'children': [
					{		
						'id'   : 'statuse',
						'title': 'Statuse',
						'type' : 'item',
						'icon' : 'gateway',
						'url'  : '/apps/statuse'
					},
					{		
						'id'   : 'gateway',
						'title': 'Gateways',
						'type' : 'item',
						'icon' : 'gateway',
						'url'  : '/apps/gateway'
					}, 
					{		
						'id'   : 'slider',
						'title': 'Sliders',
						'type' : 'item',
						'icon' : 'slider',
						'url'  : '/apps/slider'
					},  
					{		
						'id'   : 'sysmessage',
						'title': 'Sys_Message',
						'type' : 'item',
						'icon' : 'aboutus',
						'url'  : '/apps/sysmessage'
					},  
					{		
						'id'   : 'translatefile',
						'title': 'Translate',
						'type' : 'item',
						'icon' : 'aboutus',
						'url'  : '/apps/translatefile'
					},  
				]
			}
        ]
	},   
	{
        'id'      : 'report',
        'title'   : 'Reports',
        'type'    : 'group',
        'icon'    : 'pages',
        'children': [
            {
                'id'   : 'location',
                'title': 'System_Reports',
                'type' : 'collapse',
                'icon' : 'not_listed_location',               
                'children': [
                    {
                        'id'   : 'locations',
                        'title': 'Locations',
                        'type' : 'item',
                        'url'  : '/apps/locations',
                    },
                    {
                        'id'   : 'heatmap',
                        'title': 'Heatmap',
                        'type' : 'item',
                        'url'  : '/apps/heatmap'
                    },
                    {
                        'id'   : 'treemap',
                        'title': 'Treemap',
                        'type' : 'item',
                        'url'  : '/apps/treemap'
                    }
                ]               
            },
        ]
	},
	{
        'id'      : 'pages',
        'title'   : 'Pages',
        'type'    : 'group',
        'icon'    : 'pages',
        'children': [
            {
                'id'   : 'maintenance',
                'title': 'Maintenance',
                'type' : 'item',
                'icon' : 'build',
                'url'  : '/pages/maintenance'
            },
            {
                'id'   : 'profile',
                'title': 'Profile',
                'type' : 'item',
                'icon' : 'person',
                'url'  : '/pages/profile'
            },
            {
                'id'   : 'faq',
                'title': 'Faq',
                'type' : 'item',
                'icon' : 'help',
                'url'  : '/pages/faq'
            },
            {
                'id'   : 'knowledge-base',
                'title': 'Knowledge_Base',
                'type' : 'item',
                'icon' : 'import_contacts',
                'url'  : '/pages/knowledge-base'
            }
        ]
    },
];

export default navigationConfig;
