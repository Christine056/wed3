<?php

namespace Config;

use CodeIgniter\Config\BaseConfig;

class Exceptions extends BaseConfig
{
    public bool   $log            = true;
    public int    $logDepth       = 25;
    public bool   $show404Errors  = true;
    public string $errorViewPath  = APPPATH . 'Views/errors';
    public array  $ignoreCodes    = [404];
    public array  $sensitiveDataInTrace = [];
}