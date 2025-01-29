package org.example.onlinefoodorderingbackend.Service;

import lombok.RequiredArgsConstructor;
import org.example.onlinefoodorderingbackend.dao.RoleDao;
import org.example.onlinefoodorderingbackend.dao.UserDao;
import org.example.onlinefoodorderingbackend.dto.JwtResponseDto;
import org.example.onlinefoodorderingbackend.dto.LoginObj;
import org.example.onlinefoodorderingbackend.dto.UserDto;
import org.example.onlinefoodorderingbackend.jwt.JwtProvider;
import org.example.onlinefoodorderingbackend.model.Role;
import org.example.onlinefoodorderingbackend.model.User;
import org.example.onlinefoodorderingbackend.utils.UserUtils;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserDao userDao;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final RoleDao roleDao;
    private final JwtProvider jwtProvider;

    public String registerUser(UserDto userDto) {

        if(userDao.existsByUserName(userDto.getUsername())) {
            return "Username is already in use";
        }
        if(userDao.existsByEmail(userDto.getEmail())) {
            return "Email is already in use";
        }
        User user = UserUtils.userDtoToUser(userDto);
        user.setPassword(passwordEncoder.encode(userDto.getPassword()));
        user.addRole(roleDao.findRoleByRoleName(userDto.getRoleName()));
        userDao.save(user);
        return "User successfully registered";
    }

    public JwtResponseDto login(LoginObj loginObj) {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginObj.getUsername(), loginObj.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);

        User user = userDao.findByUserName(loginObj.getUsername()).orElseThrow(() -> new UsernameNotFoundException("Username not found"));

        JwtResponseDto jwtResponseDto = new JwtResponseDto();
        jwtResponseDto.setToken(jwtProvider.generateToken(authentication));
        jwtResponseDto.setMessage("Successfully logged in");
        jwtResponseDto.setUserId(user.getId());
        jwtResponseDto.setUserRole(user.getRoles().stream().map(Role::getRoleName).findFirst().get());
        return jwtResponseDto;
    }


}
