package com.brettspiel.utils;

import cn.hutool.core.net.url.UrlBuilder;
import cn.hutool.core.util.StrUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;
import java.util.Arrays;
import java.util.List;

/**
 * Created by Quach Thanh Phong
 * On 4/18/2023 - 11:14 AM
 */
@Component
public class ResourceUtils {

    private static final String DEFAULT_PROTOCOL = "http";
    private static final List<String> protocol = Arrays.asList("http", "https");

    @Autowired
    private MinIOUtils minIOUtils;


    public String formatSaveUrl(String url) {
        if (url.isBlank()) {
            return "";
        }

        UrlBuilder urlBuilder = UrlBuilder.of(url);
        String schema = urlBuilder.getScheme();
        if (!protocol.contains(schema)) {
            return url;
        }

        String hostMinIO = UrlBuilder.of(minIOUtils.getUrl()).getHost();
        if (!hostMinIO.equals(urlBuilder.getHost())) {
            return url;
        }

        return url;
//        return urlBuilder.getPath().toString();
    }

    public String formatGetUrl(String url) {
        if (url.isBlank()) {
            return "";
        }

        UrlBuilder urlBuilder = UrlBuilder.of(url);
        String host = urlBuilder.getHost();
        if (!host.isBlank()) {
            return url;
        }

        UrlBuilder urlBuilderMinIO = UrlBuilder.of(minIOUtils.getUrl());
        String protocolMinIO = urlBuilderMinIO.getScheme();
        String protocol = ResourceUtils.protocol.contains(protocolMinIO) ? protocolMinIO : DEFAULT_PROTOCOL;
        String hostMinIO = urlBuilderMinIO.getHost();
        return StrUtil.format("{}://{}{}", protocol, hostMinIO, url);
    }



    @Target({java.lang.annotation.ElementType.FIELD})
    @Retention(RetentionPolicy.RUNTIME)
    public @interface StaticUrl {
    }

}
