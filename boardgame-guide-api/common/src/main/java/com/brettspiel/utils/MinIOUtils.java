package com.brettspiel.utils;

import cn.hutool.core.util.StrUtil;
import io.minio.*;
import io.minio.http.Method;
import jakarta.annotation.PostConstruct;
import lombok.Getter;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.io.InputStream;
import java.util.concurrent.TimeUnit;

/**
 * Created by Quach Thanh Phong
 * On 4/10/2023 - 11:24 AM
 */
@Component
@Slf4j
public class MinIOUtils {

    @Getter
    @Value("${service.client.minIO.url:}")
    private String url;

    @Value("${service.client.minIO.access-key:}")
    private String accessKey;

    @Value("${service.client.minIO.secret-key:}")
    private String secretKey;

    @Value("${service.client.minIO.bucket:}")
    private String bucket;

    private MinioClient minioClient;


    @PostConstruct
    public void init() {
        if (url == null || url.isBlank()) {
            return;
        }
        // Create client
        minioClient = MinioClient.builder()
                .endpoint(url)
                .credentials(accessKey, secretKey)
                .build();

//        try {
//            SetBucketLifecycleArgs setBucketLifecycleArgs = SetBucketLifecycleArgs.builder()
//                    .bucket(bucket)
//                    .config(new LifecycleConfiguration(List.of(new LifecycleRule(
//                            Status.ENABLED,
//                            null,
//                            new Expiration((ResponseDate) null, 2, null),
//                            new RuleFilter("ioe/**"),
//                            null,
//                            null,
//                            null,
//                            null))))
//                    .build();
//            minioClient.setBucketLifecycle(setBucketLifecycleArgs);
//            log.info("MinIOUtils - set bucket lifecycle success");
//        } catch (Exception e) {
//            e.printStackTrace();
//            log.error("MinIOUtils - set bucket lifecycle - {}", e.getMessage());
//        }
    }

    public String buildObjectUrl(String objectName) {
        String objectNamePrefix = objectName.startsWith("/") ? objectName.substring(1) : objectName;
        return StrUtil.format("https://{}/{}/{}", url, bucket, objectNamePrefix);
    }

    @SneakyThrows
    public String generatePresignedUrlPut(String path, Integer expires) {
        String pathPrefix = path.startsWith("/") ? path.substring(1) : path;
        // Time expires url by second
        if (expires != null && expires > 0) {
            return minioClient.getPresignedObjectUrl(GetPresignedObjectUrlArgs.builder()
                    .method(Method.PUT)
                    .bucket(bucket)
                    .object(pathPrefix)
                    .expiry(expires, TimeUnit.SECONDS)
                    .build());
        } else {
            return minioClient.getPresignedObjectUrl(GetPresignedObjectUrlArgs.builder()
                    .method(Method.PUT)
                    .bucket(bucket)
                    .object(pathPrefix)
                    .build());
        }
    }

    @SneakyThrows
    public boolean putObject(InputStream inputStream, String filePath, String contentType) {
        String pathPrefix = filePath.startsWith("/") ? filePath.substring(1) : filePath;
        PutObjectArgs putObjectArgs = PutObjectArgs.builder()
                .bucket(bucket)
                .object(pathPrefix)
                .stream(inputStream, -1 , 10*1024*1024)
                .contentType(contentType)
                .build();
        try {
            ObjectWriteResponse objectWriteResponse = minioClient.putObject(putObjectArgs);
        } catch (Exception e) {
            log.error("MinIOUtils - putObject - {}", e.getMessage());
        }
        return true;
    }

    @SneakyThrows
    public boolean uploadFile(String filePath, String filePathUpload) {
        String pathPrefix = filePath.startsWith("/") ? filePath.substring(1) : filePath;
        UploadObjectArgs uploadObjectArgs = UploadObjectArgs.builder()
                .bucket(bucket)
                .object(pathPrefix)
                .filename(filePathUpload)
                .build();
        try {
            ObjectWriteResponse objectWriteResponse = minioClient.uploadObject(uploadObjectArgs);
        } catch (Exception e) {
            log.error("MinIOUtils - uploadFile - {}", e.getMessage());
        }

        return true;
    }

}
