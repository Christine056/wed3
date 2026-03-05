<?php

namespace App\Core;

use CodeIgniter\RESTful\ResourceController;

class MYT_Controller extends ResourceController
{
    protected $format = 'json';

    /**
     * Success response
     */
    protected function successResponse($data = null, $message = 'Success', $statusCode = 200)
    {
        return $this->respond([
            'data'    => $data,
            'message' => $message,
        ], $statusCode);
    }

    /**
     * Error response
     */
    protected function errorResponse($errors = [], $statusCode = 400)
    {
        if (is_string($errors)) {
            $errors = [$errors];
        }
        return $this->respond([
            'messages' => [
                'error_messages' => $errors,
            ],
        ], $statusCode);
    }

    /**
     * Get current timestamp
     */
    protected function now()
    {
        return date('Y-m-d H:i:s');
    }

    /**
     * Get current admin/user identifier (simplified)
     */
    protected function currentUser()
    {
        return 'system';
    }
}
