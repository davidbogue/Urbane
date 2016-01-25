package com.surmize.setup;

import com.surmize.models.Article;
import com.surmize.models.BlogProfile;
import com.surmize.repository.ArticleRepository;
import com.surmize.repository.BlogProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Calendar;
import java.util.Date;

@Component
public class DatabaseLoader implements CommandLineRunner {

    private final ArticleRepository articleRepository;
    private final BlogProfileRepository blogProfileRepository;

    @Autowired
    public DatabaseLoader(ArticleRepository repository, BlogProfileRepository blogProfileRepository) {
        this.blogProfileRepository= blogProfileRepository;
        this.articleRepository = repository;
    }

    @Override
    public void run(String... strings) throws Exception {
        this.articleRepository.save(new Article("Javascript the Meh Parts",
                                         "This is a not so interesting blog post about JavaScript and the most boring parts of it.",
                                         Calendar.getInstance().getTime(),
                                        "David Bogue"));
        this.articleRepository.save(new Article("Go Dog Go(lang)",
                "Lorem Ipsum go dog go.  Go find some generics please!",
                Calendar.getInstance().getTime(),
                "David Bogue"));
        this.articleRepository.save(new Article("Go Dog Go(lang) Part Duex",
                "Lorem Ipsum go dog go.  Go find some generics please!",
                Calendar.getInstance().getTime(),
                "David Bogue"));
        this.articleRepository.save(new Article("Javascript the Painful Parts",
                "This is a not so interesting blog post about JavaScript and the most boring parts of it. " +
                    "Here is another sentence and something else.  I want to have a longer paragraph to see how" +
                    "this looks on the main page.   I may type even more to see what is going on." +
                    "I may need to change this to something else.  We shall see.\n" +
                    "```java\n public DatabaseLoader(ArticleRepository repository, BlogProfileRepository blogProfileRepository) {\n" +
                    "        this.blogProfileRepository= blogProfileRepository;\n" +
                    "        this.articleRepository = repository;\n" +
                    "    }\n```",
                Calendar.getInstance().getTime(),
                "David Bogue"));
        this.articleRepository.save(new Article("React for Nuclear Physicists",
                "This is a not so interesting blog post about JavaScript and the most boring parts of it.",
                Calendar.getInstance().getTime(),
                "David Bogue"));
        this.blogProfileRepository.save(new BlogProfile(
                                                "Blog Title",
                                                "Blog sub title",
                                                "http://ppsparents.com/wp-content/uploads/2015/12/cool-star-wars-wallpaper-modern-with-photo-of-cool-star-wallpaper-new-in-wallpapers.jpg",
                                                "https://github.com/davidbogue",
                                                "https://twitter.com/davidbogue",
                                                "https://www.linkedin.com/in/david-bogue-119490a")
                                        );

    }
}