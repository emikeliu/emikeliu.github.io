[//]: # ({"name":"在本地使用 CPU 部署 ChatGLM-6B","author":"Mike Liu","tag":["AI"],"license":"CC-BY 4.0"})

## 为什么写本文

`ChatGLM-6B` 在中文开源大语言模型中可谓是天花板级的存在。作为对闭源大语言模型造成的隐私和数据安全问题十分担心的笔者自然是第一时间投入了尝试 `ChatGLM-6B` 之中。然而，笔者的主力设备只有 AMD Ryzen R5-5600U 中央处理器。为尝试 `ChatGLM-6B` ，笔者在二手市场专门购置了一张 NVIDIA Tesla P4 ，通过图像处理器来在 4 位整数量化下执行 `ChatGLM-6B` 。然而，这样的使用方式难以做到随时随处使用大语言模型工具，因为 4 位整数量化， `ChatGLM-6B` 的表现也受到了一定的限制。为提高大语言模型的使用效率，笔者开始查看各种深度学习推理的中央处理器加速技术有关的论文、博客和开源技术。

## 大模型的中央处理器加速

从朋友那里听说 `ONNX` 这种大模型部署的通用格式可以加速 `YOLO` 系列模型的推理速度，搜集相关资料发现 `ONNXRuntime` 或 `Intel(R) OpenVINO` 可以在中央处理器上以更快的速度执行大语言模型。使用 `HuggingFace`🤗 “变形金刚”（ `Transformers` ）库中的标准管线可以快速将文生图大模型 `Stable Diffusion` 转为 `ONNX` 格式并量化，使用 `🤗/Optimum` 以与标准管线相同的方式调用 `ONNXRuntime` 在中央处理器上完成更高速的推理。那么如何将没有标准管线支持的 `GLM` 模型优化并量化，来在中央处理器上高速执行呢？感谢 `K024` 和 `ChatGLM-MNN` 对 `GLM` 模型代码的重构，现在它可以在中央处理器上以高速执行。

笔者修改了 `K024/ChatGLM-6b-onnx-u8s8-API` ，使在中央处理器上运行的 `ChatGLM-6B` 具有了两种不同的 API 。使用 `python` 执行 `api.py` 后，可以在启动的服务地址后添加 `/docs` 来查看这两种格式不同的 API 的相关帮助。一种是 OpenAI 风格的类 `ChatGPT` API ，另一种是可以对接 `wenda-pedia` 的 API 。其中 `wenda-pedia` 是笔者对开源项目 `wenda` 进行修改后得到的，可以使用百度百科进行互联网内容搜索并通过文本向量相似度将搜索到的知识整合进入提示词上下文中，从而让大语言模型获得更好的事实问答效果。

## 参考资料

1. [在英特尔 CPU 上加速 Stable Diffusion 推理 - HuggingFace 博客](https://huggingface.co/blog/zh/stable-diffusion-inference-intel)
2. [K024/ChatGLM-6b-onnx-u8s8](https://huggingface.co/K024/ChatGLM-6b-onnx-u8s8)
3. [FastDiffusion]()
4. [emikeliu/ChatGLM-6B-onnx-u8s8-API](https://github.com/emikeliu/ChatGLM-6B-onnx-u8s8-API)