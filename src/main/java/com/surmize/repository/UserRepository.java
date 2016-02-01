package com.surmize.repository;

import com.surmize.models.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RestResource;

public interface UserRepository extends CrudRepository<User, Long> {

    User save(User var1);

    @RestResource(exported = false)
    User findOne(Long var1);

    @RestResource(exported = false)
    User findByEmail(String email);

    @RestResource(exported = false)
    Iterable<User> findAll();

    @RestResource(exported = false)
    void delete(Long var1);


}
