package com.konvo.backend.controller;

import com.konvo.backend.entity.Media;
import com.konvo.backend.service.MediaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.UUID;

import com.konvo.backend.dto.UnlockRequest;

@RestController
@RequestMapping("/api/media")
public class MediaController {

    @Autowired
    private MediaService mediaService;

    @PostMapping("/upload")
    public ResponseEntity<?> uploadMedia(

            @RequestParam("file") MultipartFile file,
            @RequestParam("title") String title,
            @RequestParam("price") Integer price,
            @RequestParam("ownerId") Long ownerId

    ) throws IOException {

        String uploadDir = System.getProperty("user.dir")
                + File.separator
                + "uploads";

        File directory = new File(uploadDir);

        if (!directory.exists()) {
            directory.mkdirs();
        }

        String originalName = file.getOriginalFilename().replace(" ", "_");
        String fileName = UUID.randomUUID() + "_" + originalName;

        File destination = new File(directory, fileName);

        file.transferTo(destination);

        Media media = new Media();
        media.setTitle(title);
        media.setImagePath(fileName);
        media.setUnlockPrice(price);
        media.setOwnerId(ownerId);

        mediaService.saveMedia(media);

        return ResponseEntity.ok(media);
    }

    @GetMapping
    public ResponseEntity<?> getAllMedia() {

        return ResponseEntity.ok(
                mediaService.getAllMedia()
        );

    }

    @PostMapping("/unlock")
    public ResponseEntity<?> unlockMedia(
            @RequestBody UnlockRequest request
    ) {

        String result = mediaService.unlockMedia(
                request.getUserId(),
                request.getMediaId()
        );

        return ResponseEntity.ok(result);
    }
    @GetMapping("/status")
    public ResponseEntity<?> checkUnlockStatus(
            @RequestParam Long userId,
            @RequestParam Long mediaId
    ) {

        boolean unlocked = mediaService.isUnlocked(userId, mediaId);

        return ResponseEntity.ok(unlocked);

    }

}