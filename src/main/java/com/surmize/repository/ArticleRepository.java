package com.surmize.repository;

import com.surmize.models.Article;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.security.access.prepost.PreAuthorize;

import javax.annotation.security.PermitAll;

public interface ArticleRepository extends PagingAndSortingRepository<Article, Long> {

    @Override
    Article save(Article s);
}
