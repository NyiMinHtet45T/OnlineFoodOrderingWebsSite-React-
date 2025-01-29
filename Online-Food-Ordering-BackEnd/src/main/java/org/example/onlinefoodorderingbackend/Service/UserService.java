package org.example.onlinefoodorderingbackend.Service;

import lombok.RequiredArgsConstructor;
import org.example.onlinefoodorderingbackend.dao.AddressDao;
import org.example.onlinefoodorderingbackend.dao.UserDao;
import org.example.onlinefoodorderingbackend.dto.AddressDto;
import org.example.onlinefoodorderingbackend.dto.UserDto;
import org.example.onlinefoodorderingbackend.model.Address;
import org.example.onlinefoodorderingbackend.model.User;
import org.example.onlinefoodorderingbackend.utils.AddressUtils;
import org.example.onlinefoodorderingbackend.utils.UserUtils;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserDao userDao;
    private final AddressDao addressDao;

    public UserDto findUserByEmail(String email) {
        return UserUtils.userToUserDto(userDao.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException("Email not found")));
    }

    public UserDto findUserById(Long id) {
        return UserUtils.userToUserDto(userDao.findById(id).orElseThrow(() -> new UsernameNotFoundException("User not found")));
    }

    public void deleteUserByEmail(Long userId) {
        User user = userDao.findById(userId).orElseThrow(() -> new UsernameNotFoundException("User not found"));
        userDao.delete(user);
    }

    public List<AddressDto> getAddressByUserId(Long userId) {
        User user = userDao.findById(userId).orElseThrow(() -> new UsernameNotFoundException("User not found"));
        return user.getAddresses().stream().map(AddressUtils::addressToAddressDto).toList();
    }

    public void createAddress(Long userId, AddressDto addressDto) {
        User user = userDao.findById(userId).orElseThrow(() -> new UsernameNotFoundException("User not found"));
        Address address = AddressUtils.addressDtoToAddress(addressDto);
        user.addAddress(address);
        addressDao.save(address);
    }

    public void updateAddress(AddressDto addressDto) {
        if(addressDao.existsById(addressDto.getId())) {
            Address address = AddressUtils.addressDtoToAddress(addressDto);
            addressDao.save(address);
        }
        throw new UsernameNotFoundException("Address not found");
    }
}
