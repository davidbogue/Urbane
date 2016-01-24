package com.surmize.repository;

import com.surmize.models.Article;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface ArticleRepository extends PagingAndSortingRepository<Article, Long> {
}
