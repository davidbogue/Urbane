package com.surmize.repository;

import com.surmize.models.Article;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.web.bind.annotation.CrossOrigin;

public interface ArticleRepository extends PagingAndSortingRepository<Article, Long> {

}
