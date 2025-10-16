package com.pia.postservice.repository;

import com.pia.postservice.entity.Donate;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DonateRepository extends MongoRepository<Donate, String> {

}
