<?php

namespace App\Controllers;

use App\Core\MYT_Controller;
use App\Models\Admin as AdminModel;
use App\Models\Guest as GuestModel;

class Admins extends MYT_Controller
{
    /**
     * POST /api/admins/login
     */
    public function login()
    {
        $username = trim($this->request->getPost('username') ?? '');
        $password = trim($this->request->getPost('password') ?? '');

        if (empty($username) || empty($password)) {
            return $this->errorResponse(['Username and password are required.']);
        }

        $model = new AdminModel();
        $admin = $model->findByCredentials($username, $password);

        if (!$admin) {
            return $this->errorResponse(['Invalid username or password.'], 401);
        }

        unset($admin['password']);

        return $this->successResponse($admin, 'Login successful.');
    }

    /**
     * GET /api/admins/stats
     * Dashboard statistics
     */
    public function stats()
    {
        $model = new GuestModel();
        $stats = $model->getStats();
        return $this->successResponse($stats, 'Stats retrieved.');
    }
}
