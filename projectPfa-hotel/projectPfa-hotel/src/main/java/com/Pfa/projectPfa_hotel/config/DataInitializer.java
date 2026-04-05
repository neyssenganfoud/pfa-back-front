package com.Pfa.projectPfa_hotel.config;

import com.Pfa.projectPfa_hotel.model.AppUser;
import com.Pfa.projectPfa_hotel.repository.AppUserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final AppUserRepository appUserRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        if (appUserRepository.count() == 0) {
            appUserRepository.save(new AppUser(
                    "admin@hotel.local",
                    passwordEncoder.encode("admin123"),
                    "ADMIN"));
        }
    }
}
