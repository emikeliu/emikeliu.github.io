[//]: # ({"name":"快速的 Stable Diffusion —— FastDiffusion","author":"Mike Liu","tag":["AI"],"license":"CC-BY 4.0"})
下面是 `FastDiffusion` 的前端代码（暂未上传至 `GitHub`
```python
import time
import uuid
import numpy
import streamlit as st
import json
from optimum.onnxruntime import ORTModel
from functools import partial
from transformers import AutoTokenizer
from diffusers import OnnxRuntimeModel
from diffusers import OnnxStableDiffusionPipeline
from diffusers import DPMSolverMultistepScheduler
from diffusers import EulerAncestralDiscreteScheduler
from diffusers import EulerDiscreteScheduler
from diffusers import EulerAncestralDiscreteScheduler
from diffusers import DDIMInverseScheduler, DDIMScheduler, DDPMScheduler, DEISMultistepScheduler, DPMSolverMultistepScheduler, DPMSolverSinglestepScheduler, EulerAncestralDiscreteScheduler, EulerDiscreteScheduler, HeunDiscreteScheduler, IPNDMScheduler, KarrasVeScheduler, KDPM2AncestralDiscreteScheduler, KDPM2DiscreteScheduler, PNDMScheduler, RePaintScheduler, SchedulerMixin, ScoreSdeVeScheduler, UnCLIPScheduler, UniPCMultistepScheduler, VQDiffusionScheduler
from transformers import CLIPTokenizer
import os
args = {}
col1, col2, col3 = st.columns([1,1,2])
dpm = None
if "json" not in st.session_state:
    st.session_state.json = True
@st.cache_resource
def load(model_id):
    tokenizer = CLIPTokenizer.from_pretrained(model_id, subfolder="tokenizer")
    vae_encoder = OnnxRuntimeModel(model=OnnxRuntimeModel.load_model(os.path.join(model_id,"vae_encoder/model.onnx")),provider="TVM-ExecutionProvider")
    vae_decoder = OnnxRuntimeModel(model=OnnxRuntimeModel.load_model(os.path.join(model_id,"vae_decoder/model.onnx")),provider="TVM-ExecutionProvider")
    text_encoder = OnnxRuntimeModel(model=OnnxRuntimeModel.load_model(os.path.join(model_id,"text_encoder/model.onnx")),provider="TVM-ExecutionProvider")
    unet = OnnxRuntimeModel(model=OnnxRuntimeModel.load_model(os.path.join(model_id,"unet/model.onnx")),provider="TVM-ExecutionProvider")
    return tokenizer,vae_encoder,vae_decoder,text_encoder,unet

with col1:
    args["height"] = st.number_input("图像高度",128,4096,512,1,disabled= st.session_state.json)
    args["width"] = st.number_input("图像宽度",128,4096,512,1,disabled= st.session_state.json)
    args["step"] = st.number_input("迭代步数",1,100,10,1,disabled= st.session_state.json)
    args["number"] = st.number_input("单次生成的张数",1,50,1,1,disabled= st.session_state.json)
    args["seed"] = st.number_input("种子",-1,2**32-1,-1,1,disabled= st.session_state.json)
    args["guidance_scale"] = st.number_input("guidance_scale",1.00,100.00,7.5,0.01,disabled= st.session_state.json)
    model_id = st.text_input("模型位置","./anythingv3u8")
with col2:
    st.selectbox("调度器种类",["DDIMInverse","DDIM","DDPM","DEISMultistep","DPMSolverMultistep","DPMSolverSinglestep","EulerAncestralDiscrete","EulerDiscrete","HeunDiscrete","IPNDM","KarrasVe","KDPM2AncestralDiscrete","PNDM","RePaint","SchedulerMixin","ScoreSdeVe","UnCLIP","UniPCMultistep","VQDiffusion"],disabled= st.session_state.json,key="schedule",index=6)
    args["prompt"] = st.text_area("正向提示词",disabled= st.session_state.json)
    args["negative"] = st.text_area("反向提示词",disabled= st.session_state.json)
    is_json = st.checkbox("导入 JSON 配置",key="json")
    json_file = st.file_uploader("上传 JSON 配置文件",accept_multiple_files=False,disabled=not st.session_state.json)
    st.button("重载模型",on_click=load)
    drawing = st.button("绘画")

def scheduleSelector():
    args={}
    args[st.session_state.schedule]=True
    if args.__contains__("DDIMInverse") and args["DDIMInverse"]:
        dpm = DDIMInverseScheduler.from_pretrained(model_id, subfolder = "scheduler")
    elif args.__contains__("DDIM") and args["DDIM"]:
        dpm = DDIMScheduler.from_pretrained(model_id, subfolder = "scheduler")
    elif args.__contains__("DEISMultistep") and args["DEISMultistep"]:
        dpm = DEISMultistepScheduler.from_pretrained(model_id, subfolder = "scheduler")
    elif args.__contains__("DDPM") and args["DDPM"]:
        dpm = DDPMScheduler.from_pretrained(model_id, subfolder = "scheduler")
    elif args.__contains__("DPMSolverMultistep") and args["DPMSolverMultistep"]:
        dpm = DPMSolverMultistepScheduler.from_pretrained(model_id, subfolder = "scheduler")
    elif args.__contains__("DPMSolverSinglestep") and args["DPMSolverSinglestep"]:
        dpm = DPMSolverSinglestepScheduler.from_pretrained(model_id, subfolder = "scheduler")
    elif args.__contains__("EulerAncestralDiscrete") and args["EulerAncestralDiscrete"]:
        dpm = EulerAncestralDiscreteScheduler.from_pretrained(model_id, subfolder = "scheduler")
    elif args.__contains__("EulerDiscrete") and args["EulerDiscrete"]:
        dpm = EulerDiscreteScheduler.from_pretrained(model_id, subfolder = "scheduler")
    elif args.__contains__("HeunDiscrete") and args["HeunDiscrete"]:
        dpm = HeunDiscreteScheduler.from_pretrained(model_id, subfolder = "scheduler")
    elif args.__contains__("IPNDM") and args["IPNDM"]:
        dpm = IPNDMScheduler.from_pretrained(model_id, subfolder = "scheduler")
    elif  args.__contains__("KarrasVe") and args["KarrasVe"]:
        dpm = KarrasVeScheduler.from_pretrained(model_id, subfolder = "scheduler")
    elif  args.__contains__("KDPM2AncestralDiscrete") and args["KDPM2AncestralDiscrete"]:
        dpm = KDPM2AncestralDiscreteScheduler.from_pretrained(model_id, subfolder = "scheduler")
    elif  args.__contains__("KDPM2Discrete") and args["KDPM2Discrete"]:
        dpm = KDPM2DiscreteScheduler.from_pretrained(model_id, subfolder = "scheduler")
    elif  args.__contains__("PNDM") and args["PNDM"]:
        dpm = PNDMScheduler.from_pretrained(model_id, subfolder = "scheduler")
    elif  args.__contains__("RePaint") and args["RePaint"]:
        dpm = RePaintScheduler.from_pretrained(model_id, subfolder = "scheduler")
    elif  args.__contains__("SchedulerMixin") and args["SchedulerMixin"]:
        dpm = SchedulerMixin.from_pretrained(model_id, subfolder = "scheduler")
    elif args.__contains__("ScoreSdeVe") and args["ScoreSdeVe"]:
        dpm = ScoreSdeVeScheduler.from_pretrained(model_id, subfolder = "scheduler")
    elif args.__contains__("UnCLIP") and args["UnCLIP"]:
        dpm = UnCLIPScheduler.from_pretrained(model_id, subfolder = "scheduler")
    elif args.__contains__("UniPCMultistep") and args["UniPCMultistep"]:
        dpm = UniPCMultistepScheduler.from_pretrained(model_id, subfolder = "scheduler")
    elif args.__contains__("VQDiffusion") and args["VQDiffusion"]:
        dpm = VQDiffusionScheduler.from_pretrained(model_id, subfolder = "scheduler")
    else:
        dpm = None
    return dpm
def callback(i,t,a):
    col3.caption("第 "+str(i)+" 次迭代，还有 "+str(int(args["step"])-i)+" 次迭代")
def clicked():
    global args
    
    dpm = scheduleSelector()
    if(st.session_state.json):
        args = json.load(json_file)
    tokenizer,vae_encoder,vae_decoder,text_encoder,unet = load(model_id=model_id)
    pipe = OnnxStableDiffusionPipeline(
        vae_encoder=vae_encoder,
        vae_decoder=vae_decoder,
        text_encoder=text_encoder,
        tokenizer=tokenizer,
        unet=unet,
        scheduler=dpm,
        safety_checker=None,
        feature_extractor=None,
        requires_safety_checker=None
    )
    if(args["seed"] != -1):
        numpy.random.seed(int(args["seed"]))
    else:
        numpy.random.seed(time.time_ns()%(2**32-1))
    prompt = args["prompt"]
    if not args.__contains__("negative"):
        args["negative"]=""
    config = {
        "seed": int(numpy.random.get_state()[1][0]),
        "height": int(args["height"]),
        "width": int(args["width"]),
        "step": int(args["step"]),
        dpm.__class__.__name__.replace("Scheduler",""): True,
        "prompt": prompt,
        "negative_prompt": args["negative"],
        "number": int(args["number"]),
        "convert": "",
        "guidance_scale":float(args["guidance_scale"])
    }
    st.session_state.image = pipe(prompt,num_inference_steps=int(args["step"]), negative_prompt=args["negative"],num_images_per_prompt=args["number"],height=int(args["height"]),width=int(args["width"]),guidance_scale=float(args["guidance_scale"]),callback=callback).images[0]
    # image1.image = image
    uid = str(uuid.uuid1())[0:4]
    cfg = open("./img"+uid+".json","w")
    json.dump(config,cfg)
    cfg.close()
    st.session_state.image.save("./img"+uid+".png")
    col3.image(st.session_state.image)
if(drawing):
    clicked()
```