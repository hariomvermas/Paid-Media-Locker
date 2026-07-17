package com.konvo.backend.service;

import com.konvo.backend.entity.Media;
import com.konvo.backend.entity.Unlock;
import com.konvo.backend.entity.User;
import com.konvo.backend.repository.MediaRepository;
import com.konvo.backend.repository.UnlockRepository;
import com.konvo.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MediaService {

    @Autowired
    private MediaRepository mediaRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UnlockRepository unlockRepository;

    public Media saveMedia(Media media) {
        return mediaRepository.save(media);
    }

    public List<Media> getAllMedia() {
        return mediaRepository.findAll();
    }

    public String unlockMedia(Long userId, Long mediaId) {

        if (unlockRepository.existsByUserIdAndMediaId(userId, mediaId)) {
            return "Media Already Unlocked";
        }

        Optional<User> userOptional = userRepository.findById(userId);
        Optional<Media> mediaOptional = mediaRepository.findById(mediaId);

        if (userOptional.isEmpty() || mediaOptional.isEmpty()) {
            return "User or Media not found";
        }

        User user = userOptional.get();
        Media media = mediaOptional.get();

        if (user.getWalletBalance() < media.getUnlockPrice()) {
            return "Insufficient Balance";
        }

        user.setWalletBalance(
                user.getWalletBalance() - media.getUnlockPrice()
        );

        userRepository.save(user);

        Unlock unlock = new Unlock();
        unlock.setUserId(userId);
        unlock.setMediaId(mediaId);

        unlockRepository.save(unlock);

        return "Media Unlocked Successfully";
    }

    public boolean isUnlocked(Long userId, Long mediaId) {

        return unlockRepository
                .findByUserIdAndMediaId(userId, mediaId)
                .isPresent();

    }

}