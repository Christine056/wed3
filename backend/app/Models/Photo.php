<?php

namespace App\Models;

use CodeIgniter\Model;

class Photo extends Model
{
    protected $table      = 'photos';
    protected $primaryKey = 'id';
    protected $useAutoIncrement = true;
    protected $returnType = 'array';

    protected $allowedFields = [
        'guest_id', 'file_url', 'drive_file_id',
        'added_by', 'added_on', 'updated_by', 'updated_on', 'is_deleted',
    ];

    protected $useTimestamps = false;

    /**
     * Get all photos with guest name
     */
    public function getAllWithGuest()
    {
        $db = \Config\Database::connect();
        return $db->query("
            SELECT p.*, g.name as guest_name
            FROM photos p
            LEFT JOIN guests g ON g.id = p.guest_id
            WHERE p.is_deleted = 0
            ORDER BY p.added_on DESC
        ")->getResultArray();
    }

    /**
     * Soft delete photo
     */
    public function softDelete(int $id, string $updatedBy = 'system')
    {
        return $this->update($id, [
            'is_deleted' => 1,
            'updated_by' => $updatedBy,
            'updated_on' => date('Y-m-d H:i:s'),
        ]);
    }
}
