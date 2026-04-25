<?php

namespace App\Controllers;

use App\Core\MYT_Controller;
use App\Models\Photo as PhotoModel;

class Photos extends MYT_Controller
{
    /**
     * POST /api/photos/upload
     * Upload photo (stored locally, can be extended for Google Drive)
     */
    public function upload()
    {
        $guestId = $this->request->getPost('guest_id');
        $file    = $this->request->getFile('photo');

        if (empty($guestId)) {
            return $this->errorResponse(['Guest ID is required.']);
        }

        if (!$file || !$file->isValid()) {
            return $this->errorResponse(['No valid file uploaded.']);
        }

        // Validate file type
        $allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
        if (!in_array($file->getMimeType(), $allowedTypes)) {
            return $this->errorResponse(['Only image files are allowed (JPEG, PNG, GIF, WEBP).']);
        }

        // Max 10MB
        if ($file->getSizeByUnit('mb') > 10) {
            return $this->errorResponse(['File size must not exceed 10MB.']);
        }

        // Create upload directory
        $uploadPath = FCPATH . 'uploads/photos/';
        if (!is_dir($uploadPath)) {
            mkdir($uploadPath, 0777, true);
        }

      $ext     = pathinfo($file->getName(), PATHINFO_EXTENSION);
      $newName = uniqid('photo_', true) . '.' . $ext;

        if (!$file->move($uploadPath, $newName)) {
            return $this->errorResponse(['File upload failed. Please try again.']);
        }

        // Build accessible URL
        $fileUrl = 'http://localhost:8080/uploads/photos/' . $newName;

        $model = new PhotoModel();
        $id = $model->insert([
            'guest_id'      => $guestId,
            'file_url'      => $fileUrl,
            'drive_file_id' => null,
            'is_deleted'    => 0,
            'added_by'      => 'guest',
            'added_on'      => $this->now(),
            'updated_by'    => 'guest',
            'updated_on'    => $this->now(),
        ]);

        $photo = $model->find($id);

        return $this->successResponse($photo, 'Photo uploaded successfully!');
    }

    /**
     * GET /api/photos/list
     */
    public function list()
    {
        $model  = new PhotoModel();
        $photos = $model->getAllWithGuest();
        return $this->successResponse($photos, 'Photos retrieved.');
    }

    /**
     * POST /api/photos/delete
     */
    public function delete($id = null)
    {
        $id = $this->request->getPost('id');

        if (empty($id)) {
            return $this->errorResponse(['Photo ID is required.']);
        }

        $model = new PhotoModel();
        $photo = $model->find($id);

        if (!$photo || $photo['is_deleted']) {
            return $this->errorResponse(['Photo not found.'], 404);
        }

        $model->softDelete($id, $this->currentUser());

        return $this->successResponse(null, 'Photo deleted.');
    }
}
