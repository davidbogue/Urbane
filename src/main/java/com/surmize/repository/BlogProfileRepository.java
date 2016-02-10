package com.surmize.repository;

import com.surmize.models.BlogProfile;
import org.springframework.data.repository.CrudRepository;
import org.springframework.security.access.prepost.PreAuthorize;

import javax.annotation.security.PermitAll;

public interface BlogProfileRepository extends CrudRepository<BlogProfile, Long>{

}
