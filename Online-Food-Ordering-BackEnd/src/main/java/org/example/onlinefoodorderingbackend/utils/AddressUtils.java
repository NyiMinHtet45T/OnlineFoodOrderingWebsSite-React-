package org.example.onlinefoodorderingbackend.utils;

import org.example.onlinefoodorderingbackend.dto.AddressDto;
import org.example.onlinefoodorderingbackend.model.Address;

public class AddressUtils {

    public static Address addressDtoToAddress(AddressDto addressDto) {
        Address address = new Address();
        address.setState(addressDto.getState());
        address.setCity(addressDto.getCity());
        address.setCountry(addressDto.getCountry());
        address.setStreetAddress(addressDto.getStreetAddress());
        return address;
    }

    public static AddressDto addressToAddressDto(Address address) {
        AddressDto addressDto = new AddressDto();
        addressDto.setId(address.getId());
        addressDto.setState(address.getState());
        addressDto.setCity(address.getCity());
        addressDto.setCountry(address.getCountry());
        addressDto.setStreetAddress(address.getStreetAddress());
        addressDto.setFullAddress(makingFullAddress(address));
        return addressDto;
    }

    private static String makingFullAddress(Address address) {
        return address.getCountry() +
                ", " +
                address.getCity() +
                ", " +
                address.getStreetAddress();
    }
}
