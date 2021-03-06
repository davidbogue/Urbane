package com.surmize.setup;

import com.surmize.models.Article;
import com.surmize.models.BlogProfile;
import com.surmize.models.User;
import com.surmize.repository.ArticleRepository;
import com.surmize.repository.BlogProfileRepository;
import com.surmize.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.preauth.PreAuthenticatedAuthenticationToken;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

@Component
public class DatabaseLoader implements CommandLineRunner {

    private final ArticleRepository articleRepository;
    private final BlogProfileRepository blogProfileRepository;
    private final UserRepository userRepository;

    @Autowired
    public DatabaseLoader(ArticleRepository repository, BlogProfileRepository blogProfileRepository, UserRepository userRepository) {
        this.blogProfileRepository= blogProfileRepository;
        this.articleRepository = repository;
        this.userRepository = userRepository;
    }

    @Override
    public void run(String... strings) throws Exception {
        List<GrantedAuthority> AUTHORITIES = new ArrayList<GrantedAuthority>();
        AUTHORITIES.add(new SimpleGrantedAuthority("USER"));
        User u = new User();
        Authentication authentication = new UrbaneAuthenticationToken(u,AUTHORITIES);
        SecurityContextHolder.getContext().setAuthentication(authentication);

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
        for( int i=0; i<20; i++){
            addArticle("This is a sample post part "+i, "this is a sample post text", "John Jones");
        }
        this.blogProfileRepository.save(new BlogProfile(
                                                "Blog Title",
                                                "Blog sub title",
                                                "/img/earth-view-space.jpg",
                                                "https://github.com/davidbogue",
                                                "https://twitter.com/davidbogue",
                                                "https://www.linkedin.com/in/david-bogue-119490a")
                                        );

        this.userRepository.save( new User("david@bogue.com","password","David Bogue", "admin") );

    }

    private void addArticle(String title, String post, String author){
        this.articleRepository.save(new Article(title,post,
                Calendar.getInstance().getTime(),
                author));
    }
}