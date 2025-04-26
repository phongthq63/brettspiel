package com.brettspiel.socket.model;

import com.brettspiel.socket.helper.JsonHelper;
import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.SneakyThrows;

import java.io.Serializable;
import java.time.Instant;
import java.util.Map;

/**
 * Created by Quach Thanh Phong
 * On 7/3/2023 - 3:56 PM
 */
@Getter
@NoArgsConstructor
public class SocketModel<T> implements Serializable {

    @Setter
    private String cmd;

    @Setter
    private T data;

    @Setter
    private int err;

    private final long ts = Instant.now().toEpochMilli();


    public SocketModel(Object object) throws JsonProcessingException {
        SocketModel<T> socketModel;
        if (object instanceof String) {
            socketModel = JsonHelper.toObject(object.toString(), SocketModel.class);
        } else if (object instanceof Map) {
            socketModel = JsonHelper.convertObject(object, SocketModel.class);
        } else {
            throw new RuntimeException("Can't format object. ");
        }

        assert socketModel != null;
        this.cmd = socketModel.getCmd();
        this.data = socketModel.getData();
        this.err = socketModel.getErr();
    }

    public SocketModel(String json) throws JsonProcessingException {
        SocketModel<T> socketModel = JsonHelper.toObject(json, SocketModel.class);

        assert socketModel != null;
        this.cmd = socketModel.getCmd();
        this.data = socketModel.getData();
        this.err = socketModel.getErr();
    }

    @SneakyThrows
    public <M> M getData(Class<M> mClass) {
        return JsonHelper.convertObject(data, mClass);
    }

}
