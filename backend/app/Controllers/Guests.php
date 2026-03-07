<?php

namespace App\Controllers;

use App\Core\MYT_Controller;
use App\Models\Guest as GuestModel;

class Guests extends MYT_Controller
{
    protected $modelName = GuestModel::class;

    /**
     * POST /api/guests/login
     * Guest login by unique password
     */
    public function login()
    {
        $password = $this->request->getPost('password');

        if (empty($password)) {
            return $this->errorResponse(['Password is required.']);
        }

        $model = new GuestModel();
        $guest = $model->findByPassword(trim($password));

        if (!$guest) {
            return $this->errorResponse(['Invalid guest code. Please check your invitation.'], 401);
        }

        // Remove password from response
        unset($guest['password']);

        return $this->successResponse($guest, 'Login successful.');
    }

    /**
     * POST /api/guests/rsvp
     * Submit RSVP response
     */
    public function rsvp()
    {
        $guestId    = $this->request->getPost('guest_id');
        $isAttending = $this->request->getPost('is_attending');
        $children   = (int)$this->request->getPost('children_count') ?? 0;
        $plusOne    = (int)$this->request->getPost('plus_one_count') ?? 0;
        $message    = $this->request->getPost('message') ?? '';

        if (empty($guestId)) {
            return $this->errorResponse(['Guest ID is required.']);
        }

        $model = new GuestModel();
        $guest = $model->find($guestId);

        if (!$guest || $guest['is_deleted']) {
            return $this->errorResponse(['Guest not found.'], 404);
        }

        $status = $isAttending ? 'confirmed' : 'declined';

        $model->update($guestId, [
            'is_attending'   => (int)$isAttending,
            'children_count' => $children,
            'plus_one_count' => $plusOne,
            'message'        => $message,
            'status'         => $status,
            'updated_by'     => 'guest',
            'updated_on'     => $this->now(),
        ]);

        return $this->successResponse(null, $isAttending ? 'RSVP confirmed! See you on the big day.' : 'RSVP submitted. Thank you for letting us know.');
    }

    /**
     * GET /api/guests/list
     * Get all guests (admin only)
     */
    public function list()
    {
        $filter = $this->request->getGet('filter') ?? '';
        $model = new GuestModel();
        $guests = $model->getAll($filter);

        // Hide passwords
        foreach ($guests as &$g) {
            unset($g['password']);
        }
        
        if (!empty($guest['tablemates'])) {
    $guest['tablemates'] = json_decode($guest['tablemates'], true);
}

        return $this->successResponse($guests, 'Guests retrieved.');
    }

    /**
     * POST /api/guests/add
     * Add new guest
     */
    public function add()
    {
        $name         = trim($this->request->getPost('name') ?? '');
        $password     = trim($this->request->getPost('password') ?? '');
        $seats        = (int)($this->request->getPost('reserved_seats') ?? 1);
        $children     = (int)($this->request->getPost('children_count') ?? 0);
        $plusOne      = (int)($this->request->getPost('plus_one_count') ?? 0);

        if (empty($name) || empty($password)) {
            return $this->errorResponse(['Name and password are required.']);
        }

        $model = new GuestModel();

        // Check duplicate password
        $existing = $model->where('password', $password)->where('is_deleted', 0)->first();
        if ($existing) {
            return $this->errorResponse(['This guest code is already in use. Please choose a unique code.']);
        }

        $id = $model->insert([
            'name'           => $name,
            'password'       => $password,
            'reserved_seats' => $seats,
            'children_count' => $children,
            'plus_one_count' => $plusOne,
            'status'         => 'pending',
            'is_attending'   => null,
            'attended_count' => 0,
            'is_deleted'     => 0,
            'added_by'       => $this->currentUser(),
            'added_on'       => $this->now(),
            'updated_by'     => $this->currentUser(),
            'updated_on'     => $this->now(),
        ]);

        $guest = $model->find($id);
        unset($guest['password']);

        return $this->successResponse($guest, 'Guest added successfully.');
    }

    /**
     * POST /api/guests/update
     * Update existing guest
     */
    public function update($id = null)
    {
        $id       = $this->request->getPost('id');
        $name     = trim($this->request->getPost('name') ?? '');
        $password = trim($this->request->getPost('password') ?? '');
        $seats    = (int)($this->request->getPost('reserved_seats') ?? 1);
        $children = (int)($this->request->getPost('children_count') ?? 0);
        $plusOne  = (int)($this->request->getPost('plus_one_count') ?? 0);

        if (empty($id) || empty($name) || empty($password)) {
            return $this->errorResponse(['ID, name, and password are required.']);
        }

        $model = new GuestModel();
        $guest = $model->find($id);

        if (!$guest || $guest['is_deleted']) {
            return $this->errorResponse(['Guest not found.'], 404);
        }

        // Check duplicate password (excluding current)
        $existing = $model->where('password', $password)->where('is_deleted', 0)->where('id !=', $id)->first();
        if ($existing) {
            return $this->errorResponse(['This guest code is already in use by another guest.']);
        }

        $model->update($id, [
            'name'           => $name,
            'password'       => $password,
            'reserved_seats' => $seats,
            'children_count' => $children,
            'plus_one_count' => $plusOne,
            'updated_by'     => $this->currentUser(),
            'updated_on'     => $this->now(),
        ]);

        return $this->successResponse(null, 'Guest updated successfully.');
    }

    /**
     * POST /api/guests/delete
     * Soft delete guest
     */
    public function delete($id = null)
    {
        $id = $this->request->getPost('id');

        if (empty($id)) {
            return $this->errorResponse(['Guest ID is required.']);
        }

        $model = new GuestModel();
        $guest = $model->find($id);

        if (!$guest || $guest['is_deleted']) {
            return $this->errorResponse(['Guest not found.'], 404);
        }

        $model->softDelete($id, $this->currentUser());

        return $this->successResponse(null, 'Guest removed successfully.');
    }
}
