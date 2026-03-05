<?php
namespace Config;
use CodeIgniter\Config\BaseConfig;
class ContentSecurityPolicy extends BaseConfig
{
    public bool $reportOnly = false;
    public string $defaultSrc = "none";
    public string $scriptSrc = "self";
    public string $styleSrc = "self";
    public string $imageSrc = "self";
    public string $baseURI = "";
    public string $childSrc = "";
    public string $connectSrc = "self";
    public string $fontSrc = "";
    public string $formAction = "self";
    public string $frameAncestors = "";
    public string $frameSrc = "";
    public string $mediaSrc = "";
    public string $objectSrc = "none";
    public string $pluginTypes = "";
    public string $sandbox = "";
    public string $workerSrc = "";
    public string $reportURI = "";
    public bool $upgradeInsecureRequests = false;
    public bool $styleNonce = false;
    public bool $scriptNonce = false;
}
