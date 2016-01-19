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
        this.repository.save(new Article("Javascript the Meh Parts",
                                         "This is a not so interesting blog post about JavaScript and the most boring parts of it.",
                                         Calendar.getInstance().getTime(),
                                        "David Bogue"));
        this.repository.save(new Article("Go Dog Go(lang)",
                                         "Lorem Ipsum go dog go.  Go find some generics please!",
                                         Calendar.getInstance().getTime(),
                                        "David Bogue"));
        this.repository.save(new Article("Go Dog Go(lang) Part Duex",
                "Lorem Ipsum go dog go.  Go find some generics please!",
                Calendar.getInstance().getTime(),
                "David Bogue"));
        this.repository.save(new Article("Javascript the Painful Parts",
                "This is a not so interesting blog post about JavaScript and the most boring parts of it.",
                Calendar.getInstance().getTime(),
                "David Bogue"));
        this.repository.save(new Article("React for Nuclear Physicists",
                "This is a not so interesting blog post about JavaScript and the most boring parts of it.",
                Calendar.getInstance().getTime(),
                "David Bogue"));

    }
}