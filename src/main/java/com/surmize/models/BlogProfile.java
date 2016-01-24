package com.surmize.models;

import lombok.Data;
import org.springframework.hateoas.ResourceSupport;

import javax.persistence.Entity;
import javax.persistence.Id;

@Data
@Entity
public class BlogProfile {

    private @Id
    Long id = 1l;  // only every one blog profile so hard coded id
    private String title;
    private String subTitle;
    private String backgroundImage;
    private String githubUrl;
    private String twitterUrl;
    private String linkedInUrl;

    public BlogProfile(){}

    public BlogProfile(String title, String subTitle, String backgroundImage, String githubUrl, String twitterUrl, String linkedInUrl) {
        this.title = title;
        this.subTitle = subTitle;
        this.backgroundImage = backgroundImage;
        this.githubUrl = githubUrl;
        this.twitterUrl = twitterUrl;
        this.linkedInUrl = linkedInUrl;
    }

}
