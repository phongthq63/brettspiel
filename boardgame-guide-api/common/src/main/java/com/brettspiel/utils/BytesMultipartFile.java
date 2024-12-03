package com.brettspiel.utils;

import org.jetbrains.annotations.NotNull;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;

public class BytesMultipartFile implements MultipartFile {
    private final byte[] bytes;
    private final String fileName;
    private final String contentType;

    public BytesMultipartFile(byte[] bytes, String fileName, String contentType) {
        this.bytes = bytes;
        this.contentType = contentType;
        this.fileName = fileName;
    }


    @NotNull
    @Override
    public String getName() {
        return this.fileName;
    }

    @Override
    public String getOriginalFilename() {
        return this.fileName;
    }

    @Override
    public String getContentType() {
        return this.contentType;
    }

    @Override
    public boolean isEmpty() {
        return bytes == null || bytes.length == 0;
    }

    @Override
    public long getSize() {
        return bytes.length;
    }

    @NotNull
    @Override
    public byte[] getBytes() throws IOException {
        return bytes;
    }

    @NotNull
    @Override
    public InputStream getInputStream() throws IOException {
        return new ByteArrayInputStream(bytes);
    }

    @Override
    public void transferTo(@NotNull File dest) throws IOException, IllegalStateException {
        try(FileOutputStream fos = new FileOutputStream(dest)) {
            fos.write(bytes);
        }
    }
}
