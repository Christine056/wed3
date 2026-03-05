<?php

namespace Config;

use CodeIgniter\Config\BaseConfig;

class Logger extends BaseConfig
{
    public int $threshold = 4;
    public string $dateFormat = 'Y-m-d H:i:s';
    public array $handlers = [
        'CodeIgniter\Log\Handlers\FileHandler' => [
            'handles' => ['critical', 'alert', 'emergency', 'debug', 'error', 'info', 'notice', 'warning'],
        ],
    ];
}
