<?php

namespace Config;

use CodeIgniter\Config\BaseConfig;

class Cache extends BaseConfig
{
    public string $handler          = 'file';
    public string $backupHandler    = 'dummy';
    public int    $ttl              = 60;
    public string $prefix           = '';
    public bool   $cacheQueryString = false;
    public array  $file             = [
        'storePath' => WRITEPATH . 'cache/',
        'mode'      => 0640,
    ];
    public array $validHandlers = [
        'dummy'     => \CodeIgniter\Cache\Handlers\DummyHandler::class,
        'file'      => \CodeIgniter\Cache\Handlers\FileHandler::class,
        'memcached' => \CodeIgniter\Cache\Handlers\MemcachedHandler::class,
        'predis'    => \CodeIgniter\Cache\Handlers\PredisHandler::class,
        'redis'     => \CodeIgniter\Cache\Handlers\RedisHandler::class,
        'wincache'  => \CodeIgniter\Cache\Handlers\WincacheHandler::class,
    ];
}