<?php

namespace App\Models;

use CodeIgniter\Model;

class Guest extends Model
{
    protected $table      = 'guests';
    protected $primaryKey = 'id';
    protected $useAutoIncrement = true;
    protected $returnType = 'array';
    protected $useSoftDeletes = false;

    protected $allowedFields = [
        'name', 'password', 'reserved_seats', 'children_count', 'plus_one_count',
        'attended_count', 'is_attending', 'status', 'message',
        'added_by', 'added_on', 'updated_by', 'updated_on', 'is_deleted',
    ];

    protected $useTimestamps = false;

    /**
     * Find guest by password (for login)
     */
    public function findByPassword(string $password)
    {
        return $this->where('password', $password)
                    ->where('is_deleted', 0)
                    ->first();
    }

    /**
     * Get all active guests with optional status filter
     */
    public function getAll(string $filter = '')
    {
        $builder = $this->where('is_deleted', 0);

        if ($filter === 'attending') {
            $builder->where('is_attending', 1);
        } elseif ($filter === 'declined') {
            $builder->where('is_attending', 0);
        } elseif ($filter === 'pending') {
            $builder->where('is_attending IS NULL');
        }

        return $builder->orderBy('name', 'ASC')->findAll();
    }

    /**
     * Dashboard statistics
     */
    public function getStats()
    {
        $db = \Config\Database::connect();

        $stats = [
            'total_invited'   => $this->where('is_deleted', 0)->countAllResults(false),
            'total_confirmed' => $this->where('is_deleted', 0)->where('is_attending', 1)->countAllResults(false),
            'total_declined'  => $this->where('is_deleted', 0)->where('is_attending', 0)->countAllResults(false),
            'total_attended'  => (int)($db->query("SELECT COALESCE(SUM(attended_count),0) as total FROM guests WHERE is_deleted=0")->getRow()->total ?? 0),
        ];

        return $stats;
    }

    /**
     * Soft delete
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
