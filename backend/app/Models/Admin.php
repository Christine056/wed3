<?php

namespace App\Models;

use CodeIgniter\Model;

class Admin extends Model
{
    protected $table      = 'admins';
    protected $primaryKey = 'id';
    protected $useAutoIncrement = true;
    protected $returnType = 'array';

    protected $allowedFields = [
        'username', 'password',
        'added_by', 'added_on', 'updated_by', 'updated_on', 'is_deleted',
    ];

    protected $useTimestamps = false;

    /**
     * Find admin by username and password
     */
    public function findByCredentials(string $username, string $password)
    {
        $admin = $this->where('username', $username)
                      ->where('is_deleted', 0)
                      ->first();

        if ($admin && password_verify($password, $admin['password'])) {
            return $admin;
        }

        // Fallback: plain text comparison (for initial setup)
        if ($admin && $admin['password'] === $password) {
            return $admin;
        }

        return null;
    }
}
