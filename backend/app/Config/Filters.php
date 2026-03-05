<?php

namespace Config;

use CodeIgniter\Config\BaseConfig;
use App\Filters\CorsFilter;

class Filters extends BaseConfig
{
    public array $aliases = [
        'csrf'          => \CodeIgniter\Filters\CSRF::class,
        'toolbar'       => \CodeIgniter\Filters\DebugToolbar::class,
        'honeypot'      => \CodeIgniter\Filters\Honeypot::class,
        'invalidchars'  => \CodeIgniter\Filters\InvalidChars::class,
        'secureheaders' => \CodeIgniter\Filters\SecureHeaders::class,
        'cors'          => CorsFilter::class,
    ];

    public array $globals = [
        'before' => [
            'cors',
            // 'honeypot',
            // 'csrf',
        ],
        'after' => [
            'cors',
            'toolbar',
            // 'honeypot',
        ],
    ];

    public array $methods = [];
    public array $filters = [];
}
