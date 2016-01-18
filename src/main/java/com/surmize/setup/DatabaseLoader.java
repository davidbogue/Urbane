package com.surmize.setup;

import com.surmize.models.Article;
import com.surmize.repository.ArticleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Calendar;

@Component
public class DatabaseLoader implements CommandLineRunner {

    private final ArticleRepository repository;

    @Autowired
    public DatabaseLoader(ArticleRepository repository) {
        this.repository = repository;
    }

    @Override
    public void run(String... strings) throws Exception {
        this.repository.save(new Article("Title2", "Article Post", Calendar.getInstance().getTime(), "David Bogue"));
    }
}