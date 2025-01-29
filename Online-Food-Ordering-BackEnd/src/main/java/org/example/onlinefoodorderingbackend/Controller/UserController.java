package org.example.onlinefoodorderingbackend.Controller;

import lombok.RequiredArgsConstructor;
import org.example.onlinefoodorderingbackend.Service.UserService;
import org.example.onlinefoodorderingbackend.dto.AddressDto;
import org.example.onlinefoodorderingbackend.dto.UserDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/user")
public class UserController {

    private final UserService userService;

    @GetMapping("/{email}")
    public ResponseEntity<UserDto> getUser(@PathVariable("email") String email) {
        return ResponseEntity.status(HttpStatus.OK).body(userService.findUserByEmail(email));
    }

    @DeleteMapping("/{userId}")
    public ResponseEntity<String> deleteUser(@PathVariable("userId") Long userId) {
        userService.deleteUserByEmail(userId);
        return ResponseEntity.status(HttpStatus.OK).body("Successfully deleted user");
    }

    @GetMapping("/id/{userId}")
    public ResponseEntity<UserDto> getUserById(@PathVariable("userId") Long userId) {
        return ResponseEntity.status(HttpStatus.OK).body(userService.findUserById(userId));
    }

    @GetMapping("/address/{userId}")
    public ResponseEntity<List<AddressDto>> getAddressByUserId(@PathVariable("userId") Long userId) {
        return ResponseEntity.status(HttpStatus.OK).body(userService.getAddressByUserId(userId));
    }

    @PostMapping("/create_address/{userId}")
    public ResponseEntity<String> createAddress(@PathVariable("userId") Long userId, @RequestBody AddressDto addressDto) {
        userService.createAddress(userId, addressDto);
        return ResponseEntity.status(HttpStatus.OK).body("Successfully Created Address");
    }
}
