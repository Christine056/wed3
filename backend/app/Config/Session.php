<?php

namespace Config;

use CodeIgniter\Config\BaseConfig;

class Session extends BaseConfig
{
    public string $driver            = 'CodeIgniter\Session\Handlers\FileHandler';
    public string $cookieName        = 'ci_session';
    public int $expiration           = 7200;
    public string $savePath          = WRITEPATH . 'session';
    public bool $matchIP             = false;
    public int $timeToUpdate         = 300;
    public bool $regenerateDestroy   = false;
    public string $DBGroup           = 'default';
    public string $table             = 'ci_sessions';
    public int $lockTimeout          = 300;
    public int $lockRetryInterval    = 1000000;
    public int $lockMaxRetries       = 300;
}
